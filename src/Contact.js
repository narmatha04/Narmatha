// src/components/Contact.jsx

import { useForm, ValidationError } from "@formspree/react";
import { Toaster, toast } from "react-hot-toast";

const Contact = () => {
  const [state, handleSubmit] = useForm("mjkajglw");

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await handleSubmit(e);

    if (result?.body?.ok) {
      toast.success("Your message has been sent! 🎉");
      e.target.reset();
    } else if (result?.body?.errors?.length) {
      toast.error("Oops! Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="pt-24 pb-20">
      <Toaster position="bottom-center" reverseOrder={false} />

      <div className="container mx-auto px-6 max-w-3xl text-center">
        <h2 className="text-3xl font-bold mb-4 text-white">Let's Connect</h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          I'm excited about the opportunity to bring my data-driven expertise to a new challenge.
          Let's talk about how I can help your team achieve its goals.
        </p>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <ValidationError prefix="Email" field="email" errors={state.errors} />

          <textarea
            id="message"
            name="message"
            placeholder="Your Message"
            rows="5"
            required
            className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
          <ValidationError prefix="Message" field="message" errors={state.errors} />

          <button
            type="submit"
            disabled={state.submitting}
            className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:bg-indigo-700 transition duration-300 transform hover:scale-105 disabled:opacity-60"
          >
            {state.submitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
