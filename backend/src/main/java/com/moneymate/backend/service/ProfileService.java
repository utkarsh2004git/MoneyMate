package com.moneymate.backend.service;

import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.moneymate.backend.dto.AuthDTO;
import com.moneymate.backend.dto.ProfileDTO;
import com.moneymate.backend.entity.ProfileEntity;
import com.moneymate.backend.repository.ProfileRepository;
import com.moneymate.backend.util.JwtUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @Value("${app.activation.url}")
    private String activationUrl;

    public ProfileDTO registerProfile(ProfileDTO profileDTO){
        ProfileEntity newProfile = toEntity(profileDTO);
        newProfile.setActivationToken(UUID.randomUUID().toString());

        
        // send activation email
        String activationLink = activationUrl+"/api/v1/activate?token=" + newProfile.getActivationToken();
        String subject = "Activate your MoneyMate account";
        String body = """
            <h2>Welcome to MoneyMate!</h2>

            Hi %s,<br>
            Thank you for registering with MoneyMate.
            Please click the button below to activate your account.<br>
            <a href="%s"
            style="
                background-color:#2563eb;
                color:white;
                text-decoration:none;
                padding:10px 20px;
                border-radius:5px;
                display:inline-block;">
                Activate Account
            </a>
            <br>
            Best regards,<br>
            <strong>MoneyMate Team</strong>
        """.formatted(newProfile.getFullName(), activationLink);
        
        emailService.sendEmail(newProfile.getEmail(), subject, body);

        // encoding password 
        newProfile.setPassword(passwordEncoder.encode(newProfile.getPassword()));

        // saving profile to database
        ProfileEntity savedProfile = profileRepository.save(newProfile);
        return toDTO(savedProfile);
    }


    public ProfileEntity toEntity(ProfileDTO profileDTO){
        return ProfileEntity.builder()
                .id(profileDTO.getId())
                .fullName(profileDTO.getFullName())
                .email(profileDTO.getEmail())
                .password(profileDTO.getPassword())
                .profileImageUrl(profileDTO.getProfileImageUrl())
                .createdAt(profileDTO.getCreatedAt())
                .updatedAt(profileDTO.getUpdatedAt())
                .build();
    }

    public ProfileDTO toDTO(ProfileEntity profileEntity){
        return ProfileDTO.builder()
                .id(profileEntity.getId())
                .fullName(profileEntity.getFullName())
                .email(profileEntity.getEmail())
                .profileImageUrl(profileEntity.getProfileImageUrl())
                .createdAt(profileEntity.getCreatedAt())
                .updatedAt(profileEntity.getUpdatedAt())
                .build();
    }

    public boolean activateProfile(String token){
        return profileRepository.findByActivationToken(token)
                .map(profile -> {
                    profile.setIsActive(true);
                    // profile.setActivationToken(null); // Clear the token after activation
                    profileRepository.save(profile);
                    return true;
                })
                .orElse(false);
    }


    public boolean isProfileActive(String email){
        return profileRepository.findByEmail(email)
                .map(ProfileEntity::getIsActive)
                .orElse(false);
    }

    public ProfileEntity getCurrentProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return profileRepository.findByEmail(email).orElseThrow(()->new UsernameNotFoundException("Profile not found with email: " + email));
    }

    public ProfileDTO getPublicProfile(String email){
        ProfileEntity currentProfile = null;
        if(email==null || email.isEmpty()){
            currentProfile = getCurrentProfile();
        } else {
            currentProfile = profileRepository.findByEmail(email).orElseThrow(()->new UsernameNotFoundException("Profile not found with email: " + email));
        }
        return ProfileDTO.builder()
                .id(currentProfile.getId())
                .fullName(currentProfile.getFullName())
                .email(currentProfile.getEmail())
                .profileImageUrl(currentProfile.getProfileImageUrl())
                .createdAt(currentProfile.getCreatedAt())
                .updatedAt(currentProfile.getUpdatedAt())
                .build();
    }


    public Map<String,Object> authenticateAndGenrateToken(AuthDTO authDTO){
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authDTO.getEmail(), authDTO.getPassword()));

            // Generate JWT 
            String token = jwtUtil.generateToken(authDTO.getEmail());

            return Map.of(
                "token",token,
                "user",getPublicProfile(authDTO.getEmail())
            );

        } catch (Exception e) {
            throw new RuntimeException("Invalid Email or Password.");
        }
    }

}
