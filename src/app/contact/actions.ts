'use server';

import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

type FormState = {
  success: boolean;
  message: string;
}

export async function submitContactForm(
  values: z.infer<typeof contactFormSchema>
): Promise<FormState> {
  const validatedFields = contactFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid form data.',
    };
  }

  // const { name, email, message } = validatedFields.data;

  // In a real application, you would now use this data
  // to send an email or log the submission to a database.
  // For this demo, we'll just simulate a success response.
  
  console.log('New contact form submission:', validatedFields.data);

  return { success: true, message: "Your message has been sent successfully! We'll get back to you shortly." };
}
