package com.moneymate.backend.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.moneymate.backend.dto.ExpenseDTO;
import com.moneymate.backend.entity.CategoryEntity;
import com.moneymate.backend.entity.ExpenseEntity;
import com.moneymate.backend.entity.ProfileEntity;
import com.moneymate.backend.repository.CategoryRepository;
import com.moneymate.backend.repository.ExpenseRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExpenseService {
    
    private final ProfileService profileService;
    private final CategoryRepository categoryRepository;
    private final ExpenseRepository expenseRepository;


    // add a new expense to db 
    public ExpenseDTO addExpense(ExpenseDTO dto){
        ProfileEntity profile =  profileService.getCurrentProfile();

        CategoryEntity category =  categoryRepository.findById(dto.getCategoryId())
        .orElseThrow(() -> new RuntimeException("Category not found"));

        ExpenseEntity newExpense = toEntity(dto, profile, category);

        newExpense = expenseRepository.save(newExpense);
        return toDTO(newExpense);
    }


    // Retrives all expenses for the current month/based on start and end date
    public List<ExpenseDTO> getCurrentMonthExpensesForCurrentProfile(){
        ProfileEntity profile = profileService.getCurrentProfile();
        LocalDate now = LocalDate.now();
        LocalDate startDate = now.withDayOfMonth(1);
        LocalDate endDate = now.withDayOfMonth(now.lengthOfMonth());
        List<ExpenseEntity> list = expenseRepository.findByProfileIdAndDateBetween(profile.getId(), startDate, endDate);

        return list.stream().map(this::toDTO).toList();

    }

    // delete expense

    public void deleteExpense(Long expenseId){
        ProfileEntity profile = profileService.getCurrentProfile();
        ExpenseEntity entity = expenseRepository.findById(expenseId)
            .orElseThrow(()-> new RuntimeException("Expense not found"));
        
        if(!entity.getProfile().getId().equals(profile.getId())){
            throw new RuntimeException("Unauthorized Access.");
        }

        expenseRepository.delete(entity);

    }


    // get latest 5 expenses of current profile

    public List<ExpenseDTO> getLastest5ExpensesOfCurrentProfile(){
        ProfileEntity profile = profileService.getCurrentProfile();
        List<ExpenseEntity> expenses = expenseRepository.findTop5ByProfileIdOrderByDateDesc(profile.getId());
        return expenses.stream().map(this::toDTO).toList();
    }

    // get total expenses of current profile
    public BigDecimal getTotalExpenseOfCurrentProfile(){
        ProfileEntity profile = profileService.getCurrentProfile();
        BigDecimal total = expenseRepository.findTotalIncomeByProfileId(profile.getId());
        return total!=null?total:BigDecimal.ZERO;
    }

    // Filter expenses

    public List<ExpenseDTO> filterExpenses(LocalDate startDate,LocalDate endDate,String keyword,Sort sort){
        ProfileEntity profile = profileService.getCurrentProfile();
        List<ExpenseEntity> list = expenseRepository.findByProfileIdAndDateBetweenAndNameContainingIgnoreCase(profile.getId(), startDate, endDate, keyword, sort);

        return list.stream().map(this::toDTO).toList();
    }


    // Notifications
    public List<ExpenseDTO> getExpensesForProfileOnDate(Long profileId,LocalDate date){
       List<ExpenseEntity> list = expenseRepository.findByProfileIdAndDate(profileId, date);
       
       return list.stream().map(this::toDTO).toList();
    }




    // helper methods

    private ExpenseEntity toEntity(ExpenseDTO dto, ProfileEntity profile, CategoryEntity category){
        return ExpenseEntity.builder()
                .name(dto.getName())
                .icon(dto.getIcon())
                .amount(dto.getAmount())
                .date(dto.getDate())
                .profile(profile)
                .category(category)
                .build();
    }
    private ExpenseDTO toDTO(ExpenseEntity entity){
        return ExpenseDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .icon(entity.getIcon())
                .amount(entity.getAmount())
                .categoryId(entity.getCategory()!=null?entity.getCategory().getId():null)
                .categoryName(entity.getCategory()!=null?entity.getCategory().getName():null)
                .date(entity.getDate())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}
