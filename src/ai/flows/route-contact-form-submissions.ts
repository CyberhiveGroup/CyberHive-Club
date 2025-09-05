'use server';

/**
 * @fileOverview AI-powered contact form submission router.
 *
 * - routeContactFormSubmission - Routes contact form submissions to the appropriate administrator.
 * - RouteContactFormSubmissionInput - The input type for the routeContactFormSubmission function.
 * - RouteContactFormSubmissionOutput - The return type for the routeContactFormSubmission function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RouteContactFormSubmissionInputSchema = z.object({
  message: z.string().describe('The message submitted through the contact form.'),
  senderEmail: z.string().email().describe('The email address of the sender.'),
});
export type RouteContactFormSubmissionInput = z.infer<typeof RouteContactFormSubmissionInputSchema>;

const RouteContactFormSubmissionOutputSchema = z.object({
  recipient: z.string().describe('The email address of the administrator to route the message to.'),
  reason: z.string().describe('The reason why the message was routed to this administrator.'),
});
export type RouteContactFormSubmissionOutput = z.infer<typeof RouteContactFormSubmissionOutputSchema>;

export async function routeContactFormSubmission(
  input: RouteContactFormSubmissionInput
): Promise<RouteContactFormSubmissionOutput> {
  return routeContactFormSubmissionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'routeContactFormSubmissionPrompt',
  input: {schema: RouteContactFormSubmissionInputSchema},
  output: {schema: RouteContactFormSubmissionOutputSchema},
  prompt: `You are an expert at routing messages to the correct administrator.

  Analyze the following message and determine the appropriate administrator to route it to.
  Available administrators are:
  - General Inquiries: cyberhive@ggits.org
  - CSL Classes: csl@cyberhive.com
  - Events: events@cyberhive.com
  - Technical Support: support@cyberhive.com

  Message:
  {{message}}

  Sender Email:
  {{senderEmail}}`,
});

const routeContactFormSubmissionFlow = ai.defineFlow(
  {
    name: 'routeContactFormSubmissionFlow',
    inputSchema: RouteContactFormSubmissionInputSchema,
    outputSchema: RouteContactFormSubmissionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
