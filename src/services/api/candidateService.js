import React from "react";
import Error from "@/components/ui/Error";
// Initialize ApperClient with Project ID and Public Key
const { ApperClient } = window.ApperSDK;
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const tableName = 'candidate_c';

export const candidateService = {
  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" } },
          { field: { Name: "email_c" } },
          { field: { Name: "phone_c" } },
          { field: { Name: "location_c" } },
          { field: { Name: "currentJobTitle_c" } },
          { field: { Name: "position_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "appliedAt_c" } },
          { field: { Name: "experienceLevel_c" } },
          { field: { Name: "skills_c" } },
          { field: { Name: "resumeSummary_c" } },
          { field: { Name: "availability_c" } }
        ],
        orderBy: [
          { fieldName: "CreatedOn", sorttype: "DESC" }
        ]
      };

      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching candidates:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error fetching candidates:", error.message);
        throw new Error(error.message);
      }
    }
  },

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" } },
          { field: { Name: "email_c" } },
          { field: { Name: "phone_c" } },
          { field: { Name: "location_c" } },
          { field: { Name: "currentJobTitle_c" } },
          { field: { Name: "position_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "appliedAt_c" } },
          { field: { Name: "experienceLevel_c" } },
          { field: { Name: "skills_c" } },
          { field: { Name: "resumeSummary_c" } },
          { field: { Name: "availability_c" } }
        ]
      };

      const response = await apperClient.getRecordById(tableName, parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching candidate with ID ${id}:`, error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error(`Error fetching candidate with ID ${id}:`, error.message);
        throw new Error(error.message);
      }
    }
  },

  async create(candidateData) {
    try {
      // Only include Updateable fields
      const updateableData = {
        Name: candidateData.name || candidateData.Name,
        Tags: candidateData.tags || candidateData.Tags || "",
        email_c: candidateData.email || candidateData.email_c,
        phone_c: candidateData.phone || candidateData.phone_c,
        location_c: candidateData.location || candidateData.location_c,
        currentJobTitle_c: candidateData.currentJobTitle || candidateData.currentJobTitle_c,
        position_c: candidateData.position || candidateData.position_c,
        status_c: candidateData.status || candidateData.status_c || "new",
        appliedAt_c: candidateData.appliedAt || candidateData.appliedAt_c || new Date().toISOString(),
        experienceLevel_c: candidateData.experienceLevel || candidateData.experienceLevel_c || "entry",
        skills_c: Array.isArray(candidateData.skills) ? candidateData.skills.join(",") : (candidateData.skills_c || ""),
        resumeSummary_c: candidateData.resumeSummary || candidateData.resumeSummary_c,
        availability_c: candidateData.availability || candidateData.availability_c || "available"
      };

      const params = {
        records: [updateableData]
      };

      const response = await apperClient.createRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create candidates ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || "Failed to create candidate");
        }
        
        return successfulRecords[0].data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating candidate:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error creating candidate:", error.message);
        throw new Error(error.message);
      }
    }
  },

  async update(id, updateData) {
    try {
      // Only include Updateable fields
      const updateableData = {
        Id: parseInt(id)
      };

      // Add only provided updateable fields
      if (updateData.name || updateData.Name) updateableData.Name = updateData.name || updateData.Name;
      if (updateData.tags || updateData.Tags) updateableData.Tags = updateData.tags || updateData.Tags;
      if (updateData.email || updateData.email_c) updateableData.email_c = updateData.email || updateData.email_c;
      if (updateData.phone || updateData.phone_c) updateableData.phone_c = updateData.phone || updateData.phone_c;
      if (updateData.location || updateData.location_c) updateableData.location_c = updateData.location || updateData.location_c;
      if (updateData.currentJobTitle || updateData.currentJobTitle_c) updateableData.currentJobTitle_c = updateData.currentJobTitle || updateData.currentJobTitle_c;
      if (updateData.position || updateData.position_c) updateableData.position_c = updateData.position || updateData.position_c;
      if (updateData.status || updateData.status_c) updateableData.status_c = updateData.status || updateData.status_c;
      if (updateData.appliedAt || updateData.appliedAt_c) updateableData.appliedAt_c = updateData.appliedAt || updateData.appliedAt_c;
      if (updateData.experienceLevel || updateData.experienceLevel_c) updateableData.experienceLevel_c = updateData.experienceLevel || updateData.experienceLevel_c;
      if (updateData.skills || updateData.skills_c) {
        updateableData.skills_c = Array.isArray(updateData.skills) ? updateData.skills.join(",") : (updateData.skills_c || updateData.skills);
      }
      if (updateData.resumeSummary || updateData.resumeSummary_c) updateableData.resumeSummary_c = updateData.resumeSummary || updateData.resumeSummary_c;
      if (updateData.availability || updateData.availability_c) updateableData.availability_c = updateData.availability || updateData.availability_c;

      const params = {
        records: [updateableData]
      };

      const response = await apperClient.updateRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update candidates ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          throw new Error(failedUpdates[0].message || "Failed to update candidate");
        }
        
        return successfulUpdates[0].data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating candidate:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error updating candidate:", error.message);
        throw new Error(error.message);
      }
    }
  },

  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete candidates ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          throw new Error(failedDeletions[0].message || "Failed to delete candidate");
        }
        
        return true;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting candidate:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error deleting candidate:", error.message);
        throw new Error(error.message);
      }
}
  }
};