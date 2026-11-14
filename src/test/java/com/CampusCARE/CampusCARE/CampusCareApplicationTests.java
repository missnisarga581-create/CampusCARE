
package com.CampusCARE.CampusCARE;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class CampusCareApplicationTests {

    @Test
    void complaintShouldReceiveDefaultStatus() {
        Complaint complaint = new Complaint();

        complaint.setStatus("Pending");

        assertEquals("Pending", complaint.getStatus());
    }

    @Test
    void complaintShouldAcceptDefaultPriority() {
        Complaint complaint = new Complaint();

        if (complaint.getPriority() == null ||
            complaint.getPriority().isBlank()) {
            complaint.setPriority("Medium");
        }

        assertEquals("Medium", complaint.getPriority());
    }

    @Test
    void criticalComplaintShouldBeIdentifiedAsSerious() {
        Complaint complaint = new Complaint();

        complaint.setPriority("Critical");
        complaint.setSeriousIssue(
            "Critical".equalsIgnoreCase(complaint.getPriority())
        );

        assertTrue(complaint.isSeriousIssue());
    }
}
