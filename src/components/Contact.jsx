import React from "react";

export default function ContactForm() {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">
        Message the Librarian
      </h2>

      {/* Replace YOUR_FORM_ID with the ID you get from Formspree */}
      <form
        action="https://formspree.io/f/2907308594649104269"
        method="POST"
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Your Name
          </label>
          <input
            type="text"
            name="name"
            required
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Book Interest / Message
          </label>
          <textarea
            name="message"
            required
            rows="4"
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="I'm looking for 'The Great Gatsby'..."
          ></textarea>
        </div>

        <div>
          <input type="text" name="_gotcha" style={{ display: "none" }} />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
