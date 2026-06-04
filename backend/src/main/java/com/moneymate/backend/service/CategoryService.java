package com.moneymate.backend.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.moneymate.backend.dto.CategoryDTO;
import com.moneymate.backend.entity.CategoryEntity;
import com.moneymate.backend.entity.ProfileEntity;
import com.moneymate.backend.repository.CategoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final ProfileService profileService;
    private final CategoryRepository categoryRepository;



    // save category
    public CategoryDTO saveCategory(CategoryDTO categoryDTO){
        ProfileEntity profile = profileService.getCurrentProfile();
        if(categoryRepository.existsByNameAndProfileId(categoryDTO.getName(), profile.getId())){
            throw new ResponseStatusException(HttpStatus.CONFLICT,"Category with this name already exists");
        }

        CategoryEntity newCategory = toEntity(categoryDTO, profile);
        newCategory = categoryRepository.save(newCategory);
        return toDTO(newCategory);
    }

    // get all the categories of current profile
    public List<CategoryDTO> getCategoriesForCurrentProfile(){
        ProfileEntity profile = profileService.getCurrentProfile();
        List<CategoryEntity> categories = categoryRepository.findByProfileId(profile.getId());
        return categories.stream().map(this::toDTO).toList(); 
    }


    // get categories by type for current profile 
    public List<CategoryDTO> getCategoriesByTypeForCurrentProfile(String type){
        ProfileEntity profile = profileService.getCurrentProfile();
        List<CategoryEntity> categories = categoryRepository.findByTypeAndProfileId(type,profile.getId());
        return categories.stream().map(this::toDTO).toList(); 
    }

    // update category for current profile 
    public CategoryDTO updateCategory(Long categoryId,CategoryDTO dto){
        ProfileEntity profile = profileService.getCurrentProfile();
        CategoryEntity existingCategory = categoryRepository.findByIdAndProfileId(categoryId, profile.getId())
            .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,"Category not Found"));
        existingCategory.setName(dto.getName());
        existingCategory.setIcon(dto.getIcon());
        existingCategory.setType(dto.getType());
        existingCategory = categoryRepository.save(existingCategory);
        return toDTO(existingCategory);
        
    }



    // helper methods

    private CategoryEntity toEntity(CategoryDTO categoryDTO, ProfileEntity profile){
        return CategoryEntity.builder()
            .name(categoryDTO.getName())
            .icon(categoryDTO.getIcon())
            .profile(profile)
            .type(categoryDTO.getType())
            .build();
    }

    private CategoryDTO toDTO(CategoryEntity categoryEntity){
        return CategoryDTO.builder()
            .id(categoryEntity.getId())
            .profileId(categoryEntity.getProfile()!=null?categoryEntity.getProfile().getId():null)
            .name(categoryEntity.getName())
            .icon(categoryEntity.getIcon())
            .type(categoryEntity.getType())
            .createdAt(categoryEntity.getCreatedAt())
            .updatedAt(categoryEntity.getUpdatedAt())
            .build();
    }

}
