// Initialize ApperClient with Project ID and Public Key
const { ApperClient } = window.ApperSDK;
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const tableName = 'job_c';

export const jobService = {
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
          { field: { Name: "title_c" } },
          { field: { Name: "company_c" } },
          { field: { Name: "location_c" } },
          { field: { Name: "jobType_c" } },
          { field: { Name: "salaryMin_c" } },
          { field: { Name: "salaryMax_c" } },
          { field: { Name: "experienceLevel_c" } },
          { field: { Name: "requiredSkills_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "createdAt_c" } },
          { field: { Name: "applicants_c" } },
          { field: { Name: "clientId_c" } }
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
        console.error("Error fetching jobs:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error fetching jobs:", error.message);
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
          { field: { Name: "title_c" } },
          { field: { Name: "company_c" } },
          { field: { Name: "location_c" } },
          { field: { Name: "jobType_c" } },
          { field: { Name: "salaryMin_c" } },
          { field: { Name: "salaryMax_c" } },
          { field: { Name: "experienceLevel_c" } },
          { field: { Name: "requiredSkills_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "createdAt_c" } },
          { field: { Name: "applicants_c" } },
          { field: { Name: "clientId_c" } }
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
        console.error(`Error fetching job with ID ${id}:`, error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error(`Error fetching job with ID ${id}:`, error.message);
        throw new Error(error.message);
      }
    }
  },

  async create(jobData) {
    try {
      // Only include Updateable fields
      const updateableData = {
        Name: jobData.title || jobData.title_c || jobData.Name,
        Tags: jobData.tags || jobData.Tags || "",
        title_c: jobData.title || jobData.title_c,
        company_c: jobData.company || jobData.company_c,
        location_c: jobData.location || jobData.location_c,
        jobType_c: jobData.jobType || jobData.jobType_c,
        salaryMin_c: jobData.salaryMin ? parseInt(jobData.salaryMin) : (jobData.salaryMin_c || null),
        salaryMax_c: jobData.salaryMax ? parseInt(jobData.salaryMax) : (jobData.salaryMax_c || null),
        experienceLevel_c: jobData.experienceLevel || jobData.experienceLevel_c,
        requiredSkills_c: jobData.requiredSkills || jobData.requiredSkills_c,
        description_c: jobData.description || jobData.description_c,
        status_c: jobData.status || jobData.status_c || "active",
        createdAt_c: jobData.createdAt || jobData.createdAt_c || new Date().toISOString(),
        applicants_c: jobData.applicants || jobData.applicants_c || 0,
        clientId_c: jobData.clientId ? parseInt(jobData.clientId) : (jobData.clientId_c || null)
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
          console.error(`Failed to create jobs ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || "Failed to create job");
        }
        
        return successfulRecords[0].data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating job:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error creating job:", error.message);
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
      if (updateData.title || updateData.title_c) {
        updateableData.Name = updateData.title || updateData.title_c;
        updateableData.title_c = updateData.title || updateData.title_c;
      }
      if (updateData.tags || updateData.Tags) updateableData.Tags = updateData.tags || updateData.Tags;
      if (updateData.company || updateData.company_c) updateableData.company_c = updateData.company || updateData.company_c;
      if (updateData.location || updateData.location_c) updateableData.location_c = updateData.location || updateData.location_c;
      if (updateData.jobType || updateData.jobType_c) updateableData.jobType_c = updateData.jobType || updateData.jobType_c;
      if (updateData.salaryMin !== undefined || updateData.salaryMin_c !== undefined) {
        updateableData.salaryMin_c = updateData.salaryMin ? parseInt(updateData.salaryMin) : (updateData.salaryMin_c || null);
      }
      if (updateData.salaryMax !== undefined || updateData.salaryMax_c !== undefined) {
        updateableData.salaryMax_c = updateData.salaryMax ? parseInt(updateData.salaryMax) : (updateData.salaryMax_c || null);
      }
      if (updateData.experienceLevel || updateData.experienceLevel_c) updateableData.experienceLevel_c = updateData.experienceLevel || updateData.experienceLevel_c;
      if (updateData.requiredSkills || updateData.requiredSkills_c) updateableData.requiredSkills_c = updateData.requiredSkills || updateData.requiredSkills_c;
      if (updateData.description || updateData.description_c) updateableData.description_c = updateData.description || updateData.description_c;
      if (updateData.status || updateData.status_c) updateableData.status_c = updateData.status || updateData.status_c;
      if (updateData.createdAt || updateData.createdAt_c) updateableData.createdAt_c = updateData.createdAt || updateData.createdAt_c;
      if (updateData.applicants !== undefined || updateData.applicants_c !== undefined) updateableData.applicants_c = updateData.applicants || updateData.applicants_c;
      if (updateData.clientId || updateData.clientId_c) updateableData.clientId_c = updateData.clientId ? parseInt(updateData.clientId) : parseInt(updateData.clientId_c);

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
          console.error(`Failed to update jobs ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          throw new Error(failedUpdates[0].message || "Failed to update job");
        }
        
        return successfulUpdates[0].data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating job:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error updating job:", error.message);
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
          console.error(`Failed to delete jobs ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          throw new Error(failedDeletions[0].message || "Failed to delete job");
        }
        
        return true;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting job:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error deleting job:", error.message);
        throw new Error(error.message);
      }
    }
  }
};