'use server';

import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function submitContactForm(values: z.infer<typeof formSchema>) {
    // Here you would typically handle the form submission, 
    // e.g., send an email, save to a database, etc.
    console.log('Form submitted:', values);

    // For this example, we'll just return a success message.
    // In a real application, you might use an AI to route this message.
    return {
        success: true,
        message: 'Thank you for your message! We will get back to you shortly.',
    };
}
