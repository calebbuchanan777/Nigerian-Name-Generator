import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateNameRequestSchema, generatedNameSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Name generation API endpoint
  app.post("/api/generate-name", async (req, res) => {
    try {
      // Validate request
      const parsedRequest = generateNameRequestSchema.safeParse(req.body);
      
      if (!parsedRequest.success) {
        return res.status(400).json({ 
          message: "Invalid request",
          error: parsedRequest.error.format() 
        });
      }
      
      const { gender = 'any', ethnicity = 'any', personalName, isPremium = false } = parsedRequest.data;
      
      // If premium features requested but not premium user
      if ((personalName || ethnicity !== 'any') && !isPremium) {
        return res.status(403).json({ 
          message: "Premium feature requested but not available with free tier" 
        });
      }
      
      // Get titles based on filters - match titles to the selected gender
      const availableTitles = await storage.getTitles(gender, ethnicity);
      
      if (availableTitles.length === 0) {
        return res.status(404).json({ message: "No titles found matching criteria" });
      }
      
      // Get first names based on filters - use the selected gender
      const availableFirstNames = await storage.getNames('firstName', gender, ethnicity);
      
      if (availableFirstNames.length === 0) {
        return res.status(404).json({ message: "No first names found matching criteria" });
      }
      
      // Get last names based on filters - last names are gender-neutral
      const availableLastNames = await storage.getNames('lastName', 'neutral', ethnicity);
      
      if (availableLastNames.length === 0) {
        return res.status(404).json({ message: "No last names found matching criteria" });
      }
      
      // Randomly select a title, first name, and last name
      const randomTitle = availableTitles[Math.floor(Math.random() * availableTitles.length)];
      const randomFirstName = availableFirstNames[Math.floor(Math.random() * availableFirstNames.length)];
      const randomLastName = availableLastNames[Math.floor(Math.random() * availableLastNames.length)];
      
      // Construct the full name
      let firstName = randomFirstName.name;
      
      // If personalName provided and premium
      if (personalName && isPremium) {
        // Mix personal name with Nigerian name - simple implementation
        // More complex mixing could be implemented
        firstName = personalName + randomFirstName.name.substring(3);
      }
      
      const fullName = `${randomTitle.title} ${firstName} ${randomLastName.name}`;
      
      // Construct and return the response
      const response = {
        fullName,
        title: randomTitle.title,
        firstName,
        lastName: randomLastName.name,
        meaning: randomFirstName.meaning,
        ethnicity: randomFirstName.ethnicity
      };
      
      res.json(response);
      
    } catch (error) {
      console.error("Error generating name:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // API to get available ethnicities
  app.get("/api/ethnicities", async (_req, res) => {
    try {
      // Return a list of available ethnicities
      res.json({
        ethnicities: [
          { id: "yoruba", name: "Yoruba" },
          { id: "igbo", name: "Igbo" },
          { id: "delta", name: "Delta" },
          { id: "hausa", name: "Hausa" }
        ]
      });
    } catch (error) {
      console.error("Error fetching ethnicities:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
