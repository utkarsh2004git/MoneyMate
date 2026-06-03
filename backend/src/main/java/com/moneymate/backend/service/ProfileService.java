package com.moneymate.backend.service;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.moneymate.backend.dto.ProfileDTO;
import com.moneymate.backend.entity.ProfileEntity;
import com.moneymate.backend.repository.ProfileRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final EmailService emailService;

    public ProfileDTO registerProfile(ProfileDTO profileDTO){
        ProfileEntity newProfile = toEntity(profileDTO);
        newProfile.setActivationToken(UUID.randomUUID().toString());
        
        // send activation email
        String activationLink = "http://localhost:8080/api/v1/activate?token=" + newProfile.getActivationToken();
        String subject = "Activate your MoneyMate account";
        String body = "Hi " + newProfile.getFullName() + ",\n\nPlease click the link below to activate your account:\n" + activationLink;
        
        emailService.sendEmail(newProfile.getEmail(), subject, body);

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

}
