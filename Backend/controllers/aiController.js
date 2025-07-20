import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const improveIdea = async(req, res, next) => {
    try {
        const { title, description, category, tags } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Title and description are required",
            });
        }

        // Get the Gemini Pro model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
    Improve this startup idea with the following details:
    Title: ${title}
    Category: ${category || "Not specified"}
    Tags: ${tags?.join(", ") || "None"}
    Description: ${description}

    Please provide a JSON response with these improvements:
    1. An improved title (more catchy and descriptive)
    2. A short description (max 200 characters) for card preview
    3. An improved full description (more detailed, with potential market analysis)
    4. Suggested relevant tags (as an array)

    Return the response in this exact JSON format:
    {
      "title": "Improved title here",
      "shortDescription": "Improved short description here",
      "fullDescription": "Improved full description here",
      "tags": ["tag1", "tag2", "tag3"]
    }

    Important: Only return valid JSON, no additional text or markdown.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean the response to get pure JSON
        const jsonStart = text.indexOf("{");
        const jsonEnd = text.lastIndexOf("}") + 1;
        const jsonString = text.slice(jsonStart, jsonEnd);

        const suggestions = JSON.parse(jsonString);

        // Validate and format the response
        if (!suggestions.title || !suggestions.shortDescription || !suggestions.fullDescription) {
            throw new Error("Invalid response format from AI");
        }

        // Ensure tags is an array
        if (!Array.isArray(suggestions.tags)) {
            suggestions.tags = suggestions.tags ?
                suggestions.tags.split(",").map(tag => tag.trim()).filter(tag => tag) :
                [];
        }

        res.status(200).json({
            success: true,
            suggestions,
        });
    } catch (error) {
        console.error("AI improvement error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to generate improvements",
        });
    }
};