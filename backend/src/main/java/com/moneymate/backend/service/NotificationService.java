package com.moneymate.backend.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.moneymate.backend.dto.ExpenseDTO;

import com.moneymate.backend.entity.ProfileEntity;
import com.moneymate.backend.repository.ProfileRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {
    private final ProfileRepository profileRepository;
    private final EmailService emailService;
    private final ExpenseService expenseService;

    @Value("${money.mate.frontendUrl}")
    private String frontendUrl;

    // @Scheduled(cron="0 * * * * *",zone="IST")
    @Scheduled(cron="0 0 22 * * *",zone="IST")
    public void sendDailyIncomeExpenseReminder(){
        log.info("Job started: sendDailyIncomeExpenseReminder()");
        List<ProfileEntity> profiles = profileRepository.findAll();
        for(ProfileEntity profile: profiles){
            String body = """
                        <h2 style="color: #2563eb; text-align: center;">
                            MoneyMate Daily Reminder
                        </h2>
                        Hi <strong>%s</strong>,

                        This is a friendly reminder to record today's income and expenses in <strong>MoneyMate</strong>.

                        Keeping your transactions updated daily helps you stay on top of your
                        finances and generate accurate reports.
                        <a href="%s"
                        style="
                            background-color: #2563eb;
                            color: white;
                            text-decoration: none;
                            padding: 10px 20px;
                            font-weight: bold;
                            display: inline-block;">
                            Open MoneyMate
                        </a>
                        Thank you for using MoneyMate to manage your finances.
                        <hr style="border: none; border-top: 1px solid #e5e7eb;">
                        <span style="color: #6b7280; font-size: 14px;">
                            Best regards, </span><br>
                            <strong>MoneyMate Team</strong>
                        """.formatted(profile.getFullName(), frontendUrl);
            
            emailService.sendEmail(profile.getEmail(),"Daily reminder",body);
            log.info("Job finished: sendDailyIncomeExpenseReminder()");    
        }
    }


    @Scheduled(cron="0 0 23 * * *",zone="IST")
    // @Scheduled(cron="0 * * * * *",zone="IST")
    public void sendDailyExpenseSummary(){
        log.info("Job started: sendDailyExpenseSummary()");
        List<ProfileEntity> profiles = profileRepository.findAll();
        for(ProfileEntity profile: profiles){
            List<ExpenseDTO> todaysExpenses = expenseService.getExpensesForProfileOnDate(profile.getId(), LocalDate.now());
            if(!todaysExpenses.isEmpty()){
                
                StringBuilder table = new StringBuilder();
                table.append("<table style='border-collapse;width:100%;'");
                table.append("<tr style='background-color:#f2f2f2;'><th style='border:1px solid #ddd;padding:8px'>S.No</th><th style='border:1px solid #ddd;padding:8px'>Name</th><th style='border:1px solid #ddd;padding:8px'>Amount</th><th style='border:1px solid #ddd;padding:8px;'>Category</th><tr>");
                int i=1;
                for(ExpenseDTO e:todaysExpenses){
                    table.append("<tr>");
                    table.append("<td style='border:1px solid #ddd;padding:8px;'>").append(i++).append("</td>");
                    table.append("<td style='border:1px solid #ddd;padding:8px;'>").append(e.getName()).append("</td>");
                    table.append("<td style='border:1px solid #ddd;padding:8px;'>").append(e.getAmount()).append("</td>");
                    table.append("<td style='border:1px solid #ddd;padding:8px;'>").append(e.getCategoryId()!=null?e.getCategoryName():"N/A").append("</td>");

                    table.append("</tr>");

                }
                table.append("</table>");
                String body = "Hi "+profile.getFullName()+",<br><br>"
                            +"here is a summary of your expenses for today:<br><br> "
                            +table+"<br><br>Best regards,<br>MoneyMate Team";
                emailService.sendEmail(profile.getEmail(), "Your daily Expense summary", body);
            }
        }
        log.info("Job finished: sendDailyExpenseSummary()");
    }
}
