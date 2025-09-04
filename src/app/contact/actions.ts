'use server';

import { z } from 'zod';
import { routeContactFormSubmission, type RouteContactFormSubmissionOutput } from '@/ai/flows/route-contact-form-submissions';

const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

type FormState = {
  success: boolean;
  data?: RouteContactFormSubmissionOutput;
  error?: string;
}

export async function submitContactForm(
  values: z.infer<typeof contactFormSchema>
): Promise<FormState> {
  const validatedFields = contactFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      error: 'Invalid form data.',
    };
  }

  const { email, message } = validatedFields.data;

  try {
    const result = await routeContactFormSubmission({
      senderEmail: email,
      message: message,
    });
    
    // In a real application, you would now use the `result.recipient` 
    // to send an email or log the submission to a database.
    // For this demo, we just return the AI's routing decision.
    
    return { success: true, data: result };

  } catch (error) {
    console.error('AI routing failed:', error);
    return {
      success: false,
      error: 'Our AI assistant could not route your message. Please try again later.',
    };
  }
}
