export const SITE = {
  name: "Eat Smart",
  tagline: "It's all about your choices!",
  phone: "+91 8767961248",
  phoneDigits: "918767961248",
  doctor: "Dr. Pinal Jain",
  credentials: "BHMS · Diploma in Dietetics and Nutrition · Naturopathy Expert",
};

export const whatsappLink = (message = "Hi Dr. Pinal, I'd like to book a consultation.") =>
  `https://wa.me/${SITE.phoneDigits}?text=${encodeURIComponent(message)}`;
