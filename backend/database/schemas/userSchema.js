// database/schemas/userSchema.json
{
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
      "email": {
        "type": "string",
        "format": "email",
        "description": "Unique college email address"
      },
      "password": {
        "type": "string",
        "description": "Hashed user password"
      },
      "fullName": {
        "type": "string",
        "minLength": 2,
        "maxLength": 100
      },
      "username": {
        "type": "string",
        "minLength": 3,
        "maxLength": 30,
        "pattern": "^[a-zA-Z0-9_]+$"
      },
      "collegeRollNo": {
        "type": "string",
        "description": "Unique college roll number"
      },
      "profilePicture": {
        "type": "string",
        "description": "Path or URL to profile picture"
      },
      "interests": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "maxItems": 10
      },
      "goals": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "maxItems": 5
      },
      "hobbies": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "maxItems": 7
      },
      "socialLinks": {
        "type": "object",
        "properties": {
          "linkedin": {"type": "string", "format": "uri"},
          "github": {"type": "string", "format": "uri"},
          "personalWebsite": {"type": "string", "format": "uri"}
        }
      },
      "matchPreferences": {
        "type": "object",
        "properties": {
          "lookingFor": {
            "type": "array", 
            "items": {
              "type": "string", 
              "enum": ["Friendship", "Mentorship", "Collaboration", "Study Partner"]
            }
          },
          "preferredInterests": {
            "type": "array",
            "items": {"type": "string"}
          }
        }
      },
      "accountStatus": {
        "type": "string", 
        "enum": ["Active", "Suspended", "Pending", "Deactivated"],
        "default": "Active"
      },
      "lastLogin": {
        "type": "string",
        "format": "date-time"
      },
      "createdAt": {
        "type": "string", 
        "format": "date-time"
      }
    },
    "required": ["email", "password", "fullName", "username", "collegeRollNo"],
    "additionalProperties": false
  }