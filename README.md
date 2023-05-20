# Instant Meeting Minutes with AI

Welcome to the repository for our :warning: **proof of concept**, "Instant Meeting Minutes with AI". This application allows users to upload Microsoft Teams video recordings and, with the help of artificial intelligence, generates comprehensive meeting minutes instantly and efficiently.

## Technology Stack
The application utilizes a combination of technologies and paradigms:

 * Front-End: We use React and TypeScript to build a user-friendly interface.
 * Project Structure: We employ Domain-Driven Design (DDD) principles for structuring the project.
 * Monorepo: We manage our project using a monorepo approach with NX.
## Backend Services
On the backend, we use a series of services to process the uploaded video:

 * Audio Extraction: We use fluent-ffmpeg to extract audio from the video.
 * Transcription and Text Analysis: We leverage the power of OpenAI to transcribe the conversation and analyze the text.

