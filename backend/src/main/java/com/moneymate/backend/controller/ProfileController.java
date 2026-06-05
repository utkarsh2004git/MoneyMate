package com.moneymate.backend.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.moneymate.backend.dto.AuthDTO;
import com.moneymate.backend.dto.ProfileDTO;
import com.moneymate.backend.service.ProfileService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor

public class ProfileController {

    private final ProfileService profileService;
    
    @PostMapping("/register")
    public ResponseEntity<ProfileDTO> resgisterProfile(@RequestBody ProfileDTO profileDTO){
        ProfileDTO registeredProfile = profileService.registerProfile(profileDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(registeredProfile);
    }


    @GetMapping("/activate")
    public ResponseEntity<String> activateProfile(@RequestParam String token){
        boolean activated = profileService.activateProfile(token);
        if(activated){
            return ResponseEntity.ok("Account activated successfully!. You can close this window.");
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid activation token.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String,Object>> login(@RequestBody AuthDTO authDTO){
        try{
            if(!profileService.isProfileActive(authDTO.getEmail())){
                
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                    Map.of("message","Account is not activated. Please check your email for the activation link.")
                );
            }

            Map<String,Object> response = profileService.authenticateAndGenrateToken(authDTO);
            return ResponseEntity.ok(response);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                Map.of("message",e.getMessage())
            );
        }
    }


}
