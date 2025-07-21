import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config({ path: './config/config.env' });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateIdeas = async(req, res) => {
    try {
        const {
            title,
            description,
            tags,
            category,
            targetAudience,
            techPreference,
            budgetLevel,
            duration,
            includeAI,
            hardwareBased,
            researchOriented,
            surprise
        } = req.body;

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `
    You are an expert product strategist and innovation consultant.
    Generate 2 detailed and creative project/startup ideas based on the following parameters:
    
    Title: ${title || "Not provided"}
    Description: ${description || "Not provided"}
    Tags: ${tags ? tags.join(', ') : "None"}
    Category: ${category || "Not specified"}
    Target Audience: ${targetAudience || "Not specified"}
    Tech Preference: ${techPreference || "None"}
    Budget Level: ${budgetLevel || "Not specified"}
    Duration: ${duration || "Not specified"}
    
    Special Requirements:
    ${includeAI ? "- Must include AI/ML components\n" : ""}
    ${hardwareBased ? "- Should be hardware-based\n" : ""}
    ${researchOriented ? "- Needs research orientation\n" : ""}
    ${surprise ? "- Include an unexpected domain twist\n" : ""}
    
    For each idea, provide the following details in clean, plain text format (NO MARKDOWN, NO ASTERISKS):
    
    1. [Title]: Clear project title
    2. [Pitch]: One-line description
    3. [Key Features]: 
       - Feature 1
       - Feature 2
       - Feature 3
    4. [Market Need]: Explanation of why this is valuable
    5. [Technology]: Technologies required
    6. [Business Model]: How it makes money
    7. [Bonus Tips]: Any additional insights
    8. [Visual Concept]: Detailed description for an image that represents this idea
    
    Ensure the output is professional, well-structured, and free from markdown symbols.
    Use clear section headings in brackets like [Section] and maintain consistent formatting.
    `;

        // Generate ideas
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Process the response to clean it up
        const cleanResponse = text
            .replace(/\*\*/g, '') // Remove markdown bold
            .replace(/\*/g, '') // Remove asterisks
            .replace(/```/g, '') // Remove code blocks
            .replace(/#+\s*/g, '') // Remove markdown headers
            .trim();

        // Split into individual ideas
        const ideaBlocks = cleanResponse.split(/(?=\d+\.\s*\[Title\]:)/g)
            .filter(block => block.trim())
            .map(block => block.trim());

        // Further process each idea block
        const formattedIdeas = ideaBlocks.map(block => {
            // Extract visual concept separately
            const visualMatch = block.match(/\[Visual Concept\]:\s*(.*?)(?=\n\d+\.|$)/s);
            const visualConcept = visualMatch ? visualMatch[1].trim() : '';

            // Clean the main content
            const cleanContent = block.replace(/\[Visual Concept\]:.*?(?=\n\d+\.|$)/s, '')
                .replace(/\n\s*\n/g, '\n') // Remove excessive newlines
                .trim();

            return {
                content: cleanContent,
                visualConcept: visualConcept
            };
        });

        res.status(200).json({
            success: true,
            ideas: formattedIdeas
        });

    } catch (error) {
        console.error("Error generating ideas:", error);
        res.status(500).json({
            success: false,
            message: "Failed to generate ideas",
            error: error.message
        });
    }
};