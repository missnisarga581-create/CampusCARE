
package com.CampusCARE.CampusCARE;

import java.time.LocalDateTime;

public class Complaint {

    private Integer id;
    private String studentName;
    private String category;
    private String description;
    private String status;
    private String priority;
    private LocalDateTime submittedAt;
    private boolean seriousIssue;

    public Complaint() {
    }

    public Complaint(Integer id, String studentName, String category,
                     String description, String status, String priority,
                     LocalDateTime submittedAt, boolean seriousIssue) {
        this.id = id;
        this.studentName = studentName;
        this.category = category;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.submittedAt = submittedAt;
        this.seriousIssue = seriousIssue;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public LocalDateTime getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(LocalDateTime submittedAt) {
        this.submittedAt = submittedAt;
    }

    public boolean isSeriousIssue() {
        return seriousIssue;
    }

    public void setSeriousIssue(boolean seriousIssue) {
        this.seriousIssue = seriousIssue;
    }
}
