
package com.CampusCARE.CampusCARE;

import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/complaints")
public class ComplaintController {

    private List<Complaint> complaints = new ArrayList<>();
    private int nextId = 1;

    // Submit a new complaint
    @PostMapping
    public Complaint addComplaint(@RequestBody Complaint complaint) {

        complaint.setId(nextId++);
        complaint.setStatus("Pending");

        if (complaint.getPriority() == null ||
            complaint.getPriority().isBlank()) {
            complaint.setPriority("Medium");
        }

        complaint.setSubmittedAt(LocalDateTime.now());

        complaint.setSeriousIssue(
            complaint.isSeriousIssue() ||
            "Critical".equalsIgnoreCase(complaint.getPriority())
        );

        complaints.add(complaint);

        return complaint;
    }

    // Retrieve all complaints
    @GetMapping
    public List<Complaint> getComplaints() {
        return complaints;
    }

    // Update complaint status
    @PatchMapping("/{id}/status")
    public Complaint updateStatus(
            @PathVariable int id,
            @RequestParam String status) {

        for (Complaint complaint : complaints) {
            if (complaint.getId() == id) {
                complaint.setStatus(status);
                return complaint;
            }
        }

        throw new RuntimeException("Complaint not found");
    }
}

