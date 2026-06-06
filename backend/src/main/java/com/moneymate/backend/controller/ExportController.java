package com.moneymate.backend.controller;

import java.io.ByteArrayInputStream;
import java.util.List;

import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.moneymate.backend.dto.IncomeDTO;
import com.moneymate.backend.service.ExcelExportService;
import com.moneymate.backend.service.IncomeService;

import lombok.RequiredArgsConstructor;

@RestController

@RequiredArgsConstructor
public class ExportController {

    private final IncomeService incomeService;
    private final ExcelExportService excelExportService;

    @GetMapping("/excel/download/income")
    public ResponseEntity<Resource> downloadIncomeExcel() {
        
        // 1. Fetch the data using your existing service
        List<IncomeDTO> incomes = incomeService.getCurrentMonthExpensesForCurrentProfile();

        // 2. Generate the Excel file stream
        ByteArrayInputStream in = excelExportService.exportIncomesToExcel(incomes);

        // 3. Prepare the response
        String filename = "income_details.xlsx";
        InputStreamResource file = new InputStreamResource(in);

        return ResponseEntity.ok()
                // The CONTENT_DISPOSITION header tells the browser to download the file instead of opening it
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                // This is the official MIME type for .xlsx files
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(file);
    }
}