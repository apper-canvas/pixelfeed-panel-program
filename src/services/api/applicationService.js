// Initialize ApperClient with Project ID and Public Key
const { ApperClient } = window.ApperSDK;
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const tableName = 'application_c';

export const applicationService = {
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
          { field: { Name: "appliedAt_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "notes_c" } },
          { field: { Name: "interview_c" } },
          { field: { Name: "jobId_c" } },
          { field: { Name: "candidateId_c" } }
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
        console.error("Error fetching applications:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error fetching applications:", error.message);
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
          { field: { Name: "appliedAt_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "notes_c" } },
          { field: { Name: "interview_c" } },
          { field: { Name: "jobId_c" } },
          { field: { Name: "candidateId_c" } }
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
        console.error(`Error fetching application with ID ${id}:`, error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error(`Error fetching application with ID ${id}:`, error.message);
        throw new Error(error.message);
      }
    }
  },

  async getByJobId(jobId) {
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
          { field: { Name: "appliedAt_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "notes_c" } },
          { field: { Name: "interview_c" } },
          { field: { Name: "jobId_c" } },
          { field: { Name: "candidateId_c" } }
        ],
        where: [
          {
            FieldName: "jobId_c",
            Operator: "EqualTo",
            Values: [parseInt(jobId)]
          }
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
        console.error("Error fetching applications by job ID:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error fetching applications by job ID:", error.message);
        throw new Error(error.message);
      }
    }
  },

  async getByCandidateId(candidateId) {
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
          { field: { Name: "appliedAt_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "notes_c" } },
          { field: { Name: "interview_c" } },
          { field: { Name: "jobId_c" } },
          { field: { Name: "candidateId_c" } }
        ],
        where: [
          {
            FieldName: "candidateId_c",
            Operator: "EqualTo",
            Values: [parseInt(candidateId)]
          }
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
        console.error("Error fetching applications by candidate ID:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error fetching applications by candidate ID:", error.message);
        throw new Error(error.message);
      }
    }
  },

  async create(applicationData) {
    try {
      // Check if application already exists
      const existingAppsResponse = await apperClient.fetchRecords(tableName, {
        fields: [{ field: { Name: "Id" } }],
        where: [
          {
            FieldName: "jobId_c",
            Operator: "EqualTo",
            Values: [parseInt(applicationData.jobId || applicationData.jobId_c)]
          },
          {
            FieldName: "candidateId_c", 
            Operator: "EqualTo",
            Values: [parseInt(applicationData.candidateId || applicationData.candidateId_c)]
          }
        ]
      });

      if (existingAppsResponse.success && existingAppsResponse.data && existingAppsResponse.data.length > 0) {
        throw new Error('Candidate has already been applied to this job');
      }

      // Only include Updateable fields
      const updateableData = {
        Name: `Application - ${Date.now()}`,
        Tags: applicationData.tags || applicationData.Tags || "",
        appliedAt_c: applicationData.appliedAt || applicationData.appliedAt_c || new Date().toISOString(),
        status_c: applicationData.status || applicationData.status_c || "applied",
        notes_c: applicationData.notes || applicationData.notes_c || "",
        interview_c: applicationData.interview || applicationData.interview_c || "",
        jobId_c: parseInt(applicationData.jobId || applicationData.jobId_c),
        candidateId_c: parseInt(applicationData.candidateId || applicationData.candidateId_c)
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
          console.error(`Failed to create applications ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || "Failed to create application");
        }
        
        return successfulRecords[0].data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating application:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error creating application:", error.message);
        throw new Error(error.message);
      }
    }
  },

  async updateStatus(applicationId, newStatus) {
    try {
      const validStatuses = ['applied', 'screening', 'interview_scheduled', 'final_review', 'hired', 'rejected'];
      if (!validStatuses.includes(newStatus)) {
        throw new Error(`Invalid status: ${newStatus}. Valid statuses are: ${validStatuses.join(', ')}`);
      }

      const updateableData = {
        Id: parseInt(applicationId),
        status_c: newStatus
      };

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
          console.error(`Failed to update application status ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          throw new Error(failedUpdates[0].message || "Failed to update application status");
        }
        
        return successfulUpdates[0].data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating application status:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error updating application status:", error.message);
        throw new Error(error.message);
      }
    }
  },

  async update(id, applicationData) {
    try {
      // Only include Updateable fields
      const updateableData = {
        Id: parseInt(id)
      };

      // Add only provided updateable fields
      if (applicationData.name || applicationData.Name) updateableData.Name = applicationData.name || applicationData.Name;
      if (applicationData.tags || applicationData.Tags) updateableData.Tags = applicationData.tags || applicationData.Tags;
      if (applicationData.appliedAt || applicationData.appliedAt_c) updateableData.appliedAt_c = applicationData.appliedAt || applicationData.appliedAt_c;
      if (applicationData.status || applicationData.status_c) updateableData.status_c = applicationData.status || applicationData.status_c;
      if (applicationData.notes || applicationData.notes_c) updateableData.notes_c = applicationData.notes || applicationData.notes_c;
      if (applicationData.interview || applicationData.interview_c) updateableData.interview_c = applicationData.interview || applicationData.interview_c;
      if (applicationData.jobId || applicationData.jobId_c) updateableData.jobId_c = parseInt(applicationData.jobId || applicationData.jobId_c);
      if (applicationData.candidateId || applicationData.candidateId_c) updateableData.candidateId_c = parseInt(applicationData.candidateId || applicationData.candidateId_c);

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
          console.error(`Failed to update applications ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          throw new Error(failedUpdates[0].message || "Failed to update application");
        }
        
        return successfulUpdates[0].data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating application:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error updating application:", error.message);
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
          console.error(`Failed to delete applications ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          throw new Error(failedDeletions[0].message || "Failed to delete application");
        }
        
        return true;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting application:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error deleting application:", error.message);
        throw new Error(error.message);
      }
    }
  },

  async checkApplication(jobId, candidateId) {
    try {
      const params = {
        fields: [{ field: { Name: "Id" } }],
        where: [
          {
            FieldName: "jobId_c",
            Operator: "EqualTo", 
            Values: [parseInt(jobId)]
          },
          {
            FieldName: "candidateId_c",
            Operator: "EqualTo",
            Values: [parseInt(candidateId)]
          }
        ]
      };

      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response.success) {
        return null;
      }

      return response.data && response.data.length > 0 ? response.data[0] : null;
    } catch (error) {
      console.error("Error checking application:", error);
      return null;
    }
  },

  async scheduleInterview(applicationId, interviewData) {
    try {
      const { date, time, interviewer, type, notes } = interviewData;
      if (!date || !time || !interviewer || !type) {
        throw new Error('Date, time, interviewer, and type are required');
      }

      const validTypes = ['Phone', 'Video', 'In-person'];
      if (!validTypes.includes(type)) {
        throw new Error('Invalid interview type');
      }

      const interviewDetails = JSON.stringify({
        date,
        time,
        interviewer,
        type,
        notes: notes || ''
      });

      const updateableData = {
        Id: parseInt(applicationId),
        interview_c: interviewDetails,
        status_c: 'interview_scheduled'
      };

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
          console.error(`Failed to schedule interview ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          throw new Error(failedUpdates[0].message || "Failed to schedule interview");
        }
        
        return successfulUpdates[0].data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error scheduling interview:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error scheduling interview:", error.message);
        throw new Error(error.message);
      }
    }
  },

  async updateInterview(applicationId, interviewData) {
    try {
      // Get existing application first
      const existingApp = await this.getById(applicationId);
      if (!existingApp || !existingApp.interview_c) {
        throw new Error('No interview scheduled for this application');
      }

      let existingInterview = {};
      try {
        existingInterview = JSON.parse(existingApp.interview_c);
      } catch (e) {
        existingInterview = {};
      }

      const updatedInterview = {
        ...existingInterview,
        ...interviewData
      };

      const updateableData = {
        Id: parseInt(applicationId),
        interview_c: JSON.stringify(updatedInterview)
      };

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
          console.error(`Failed to update interview ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          throw new Error(failedUpdates[0].message || "Failed to update interview");
        }
        
        return successfulUpdates[0].data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating interview:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error updating interview:", error.message);
        throw new Error(error.message);
      }
    }
  },

  async getUpcomingInterviews() {
    try {
      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "interview_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "jobId_c" } },
          { field: { Name: "candidateId_c" } }
        ],
        where: [
          {
            FieldName: "status_c",
            Operator: "EqualTo",
            Values: ["interview_scheduled"]
          }
        ]
      };

      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      const now = new Date();
      const upcomingInterviews = (response.data || [])
        .map(app => {
          try {
            const interview = JSON.parse(app.interview_c || '{}');
            return {
              ...app,
              interview,
              interviewDateTime: new Date(`${interview.date}T${interview.time}`)
            };
          } catch (e) {
            return null;
          }
        })
        .filter(app => app && app.interviewDateTime >= now)
        .sort((a, b) => a.interviewDateTime - b.interviewDateTime);

      return upcomingInterviews.map(app => {
        const { interviewDateTime, ...rest } = app;
        return rest;
      });
    } catch (error) {
      console.error("Error fetching upcoming interviews:", error);
      return [];
    }
  }
};