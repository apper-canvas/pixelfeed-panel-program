import React from "react";
import Error from "@/components/ui/Error";
// Initialize ApperClient with Project ID and Public Key
const { ApperClient } = window.ApperSDK;
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const tableName = 'client_c';

export const clientService = {
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
          { field: { Name: "companyName_c" } },
          { field: { Name: "contactPerson_c" } },
          { field: { Name: "email_c" } },
          { field: { Name: "phone_c" } },
          { field: { Name: "address_c" } },
          { field: { Name: "relationshipStatus_c" } },
          { field: { Name: "createdAt_c" } }
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
        console.error("Error fetching clients:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error fetching clients:", error.message);
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
          { field: { Name: "companyName_c" } },
          { field: { Name: "contactPerson_c" } },
          { field: { Name: "email_c" } },
          { field: { Name: "phone_c" } },
          { field: { Name: "address_c" } },
          { field: { Name: "relationshipStatus_c" } },
          { field: { Name: "createdAt_c" } }
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
        console.error(`Error fetching client with ID ${id}:`, error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error(`Error fetching client with ID ${id}:`, error.message);
        throw new Error(error.message);
      }
    }
  },

  async create(clientData) {
    try {
      // Only include Updateable fields
      const updateableData = {
        Name: clientData.companyName || clientData.companyName_c || clientData.Name,
        Tags: clientData.tags || clientData.Tags || "",
        companyName_c: clientData.companyName || clientData.companyName_c,
        contactPerson_c: clientData.contactPerson || clientData.contactPerson_c,
        email_c: clientData.email || clientData.email_c,
        phone_c: clientData.phone || clientData.phone_c,
        address_c: clientData.address || clientData.address_c,
        relationshipStatus_c: clientData.relationshipStatus || clientData.relationshipStatus_c || "prospect",
        createdAt_c: clientData.createdAt || clientData.createdAt_c || new Date().toISOString()
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
          console.error(`Failed to create clients ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || "Failed to create client");
        }
        
        return successfulRecords[0].data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating client:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error creating client:", error.message);
        throw new Error(error.message);
      }
    }
  },

  async update(id, clientData) {
    try {
      // Only include Updateable fields
      const updateableData = {
        Id: parseInt(id)
      };

      // Add only provided updateable fields
      if (clientData.companyName || clientData.companyName_c) {
        updateableData.Name = clientData.companyName || clientData.companyName_c;
        updateableData.companyName_c = clientData.companyName || clientData.companyName_c;
      }
      if (clientData.tags || clientData.Tags) updateableData.Tags = clientData.tags || clientData.Tags;
      if (clientData.contactPerson || clientData.contactPerson_c) updateableData.contactPerson_c = clientData.contactPerson || clientData.contactPerson_c;
      if (clientData.email || clientData.email_c) updateableData.email_c = clientData.email || clientData.email_c;
      if (clientData.phone || clientData.phone_c) updateableData.phone_c = clientData.phone || clientData.phone_c;
      if (clientData.address || clientData.address_c) updateableData.address_c = clientData.address || clientData.address_c;
      if (clientData.relationshipStatus || clientData.relationshipStatus_c) updateableData.relationshipStatus_c = clientData.relationshipStatus || clientData.relationshipStatus_c;
      if (clientData.createdAt || clientData.createdAt_c) updateableData.createdAt_c = clientData.createdAt || clientData.createdAt_c;

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
          console.error(`Failed to update clients ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          throw new Error(failedUpdates[0].message || "Failed to update client");
        }
        
        return successfulUpdates[0].data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating client:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error updating client:", error.message);
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
          console.error(`Failed to delete clients ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          throw new Error(failedDeletions[0].message || "Failed to delete client");
        }
        
        return true;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting client:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error deleting client:", error.message);
        throw new Error(error.message);
      }
}
  }
};