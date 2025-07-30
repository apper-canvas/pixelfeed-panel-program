// Initialize ApperClient with Project ID and Public Key
const { ApperClient } = window.ApperSDK;
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const tableName = 'note_c';

export const noteService = {
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
          { field: { Name: "entityType_c" } },
          { field: { Name: "entityId_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "content_c" } },
          { field: { Name: "createdAt_c" } },
          { field: { Name: "updatedAt_c" } }
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
        console.error("Error fetching notes:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error fetching notes:", error.message);
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
          { field: { Name: "entityType_c" } },
          { field: { Name: "entityId_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "content_c" } },
          { field: { Name: "createdAt_c" } },
          { field: { Name: "updatedAt_c" } }
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
        console.error(`Error fetching note with ID ${id}:`, error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error(`Error fetching note with ID ${id}:`, error.message);
        throw new Error(error.message);
      }
    }
  },

  async getByEntity(entityType, entityId) {
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
          { field: { Name: "entityType_c" } },
          { field: { Name: "entityId_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "content_c" } },
          { field: { Name: "createdAt_c" } },
          { field: { Name: "updatedAt_c" } }
        ],
        where: [
          {
            FieldName: "entityType_c",
            Operator: "EqualTo",
            Values: [entityType]
          },
          {
            FieldName: "entityId_c",
            Operator: "EqualTo",
            Values: [parseInt(entityId)]
          }
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
        console.error("Error fetching notes by entity:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error fetching notes by entity:", error.message);
        throw new Error(error.message);
      }
    }
  },

  async create(noteData) {
    try {
      // Validate required fields
      if (!noteData.entityType || !noteData.entityId || !noteData.category || !noteData.content?.trim()) {
        throw new Error("Entity type, entity ID, category, and content are required");
      }

      // Only include Updateable fields
      const now = new Date().toISOString();
      const updateableData = {
        Name: `Note - ${noteData.category} - ${Date.now()}`,
        Tags: noteData.tags || noteData.Tags || "",
        entityType_c: noteData.entityType,
        entityId_c: parseInt(noteData.entityId),
        category_c: noteData.category,
        content_c: noteData.content.trim(),
        createdAt_c: now,
        updatedAt_c: now
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
          console.error(`Failed to create notes ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || "Failed to create note");
        }
        
        return successfulRecords[0].data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating note:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error creating note:", error.message);
        throw new Error(error.message);
      }
    }
  },

  async update(id, updateData) {
    try {
      // Only include Updateable fields
      const updateableData = {
        Id: parseInt(id),
        updatedAt_c: new Date().toISOString()
      };

      // Add only provided updateable fields
      if (updateData.name || updateData.Name) updateableData.Name = updateData.name || updateData.Name;
      if (updateData.tags || updateData.Tags) updateableData.Tags = updateData.tags || updateData.Tags;
      if (updateData.entityType || updateData.entityType_c) updateableData.entityType_c = updateData.entityType || updateData.entityType_c;
      if (updateData.entityId || updateData.entityId_c) updateableData.entityId_c = parseInt(updateData.entityId || updateData.entityId_c);
      if (updateData.category || updateData.category_c) updateableData.category_c = updateData.category || updateData.category_c;
      if (updateData.content || updateData.content_c) updateableData.content_c = (updateData.content || updateData.content_c)?.trim();
      if (updateData.createdAt || updateData.createdAt_c) updateableData.createdAt_c = updateData.createdAt || updateData.createdAt_c;

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
          console.error(`Failed to update notes ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          throw new Error(failedUpdates[0].message || "Failed to update note");
        }
        
        return successfulUpdates[0].data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating note:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error updating note:", error.message);
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
          console.error(`Failed to delete notes ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          throw new Error(failedDeletions[0].message || "Failed to delete note");
        }
        
        return true;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting note:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error deleting note:", error.message);
        throw new Error(error.message);
      }
    }
  },

  // Helper method to check if note can be edited (within 24 hours)
  canEdit(note) {
    const noteTime = new Date(note.createdAt_c || note.CreatedOn);
    const now = new Date();
    const hoursDiff = (now - noteTime) / (1000 * 60 * 60);
    return hoursDiff <= 24;
  }
};