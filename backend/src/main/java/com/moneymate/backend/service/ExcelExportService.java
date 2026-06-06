package com.moneymate.backend.service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import com.moneymate.backend.dto.ExpenseDTO;
import com.moneymate.backend.dto.IncomeDTO;

@Service
public class ExcelExportService {

    public  ByteArrayInputStream exportIncomesToExcel(List<IncomeDTO> incomes) {
        // XSSFWorkbook is used for .xlsx files
        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            
            Sheet sheet = workbook.createSheet("Income Details");

            // 1. Create Header Row
            Row headerRow = sheet.createRow(0);
            // String[] headers = {"ID", "Name", "Category", "Amount", "Date"};
            String[] headers = {"S.No.","Name", "Category", "Amount", "Date"};
            
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
            }

            // 2. Populate Data Rows
            int rowIndex = 1;
            int sNo=1;
            for (IncomeDTO income : incomes) {
                Row row = sheet.createRow(rowIndex++);

                row.createCell(0).setCellValue(sNo++);
                row.createCell(1).setCellValue(income.getName() != null ? income.getName() : "N/A");
                row.createCell(2).setCellValue(income.getCategoryName() != null ? income.getCategoryName() : "Uncategorized");
                row.createCell(3).setCellValue(income.getAmount() != null ? income.getAmount().doubleValue() : 0.0);
                row.createCell(4).setCellValue(income.getDate() != null ? income.getDate().toString() : "N/A");
            }

            // 3. Write to Output Stream
            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
            
        } catch (IOException e) {
            throw new RuntimeException("Failed to export income data to Excel: " + e.getMessage());
        }
    }

    public  ByteArrayInputStream exportExpenseToExcel(List<ExpenseDTO> expenses) {
        // XSSFWorkbook is used for .xlsx files
        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            
            Sheet sheet = workbook.createSheet("Expense Details");

            // 1. Create Header Row
            Row headerRow = sheet.createRow(0);
            // String[] headers = {"ID", "Name", "Category", "Amount", "Date"};
            String[] headers = {"S.No.","Name", "Category", "Amount", "Date"};
            
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
            }

            // 2. Populate Data Rows
            int rowIndex = 1;
            int sNo=1;
            for (ExpenseDTO expense : expenses) {
                Row row = sheet.createRow(rowIndex++);

                row.createCell(0).setCellValue(sNo++);
                row.createCell(1).setCellValue(expense.getName() != null ? expense.getName() : "N/A");
                row.createCell(2).setCellValue(expense.getCategoryName() != null ? expense.getCategoryName() : "Uncategorized");
                row.createCell(3).setCellValue(expense.getAmount() != null ? expense.getAmount().doubleValue() : 0.0);
                row.createCell(4).setCellValue(expense.getDate() != null ? expense.getDate().toString() : "N/A");
            }

            // 3. Write to Output Stream
            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
            
        } catch (IOException e) {
            throw new RuntimeException("Failed to export expense data to Excel: " + e.getMessage());
        }
    }
}