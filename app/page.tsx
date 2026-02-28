"use client";

import { ArrowRight, Check, MessageSquare, Scale, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

export default function LandingPage() {
  const features = [
    {
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      title: "AI Legal Chatbot",
      description:
        "Get instant answers to your legal questions from our AI-powered chatbot.",
      link: "/chat",
    },
    {
      icon: <Search className="h-10 w-10 text-primary" />,
      title: "Case Tracker",
      description:
        "Track your legal cases in real-time with updates on status and next steps.",
      link: "/dashboard",
    },
    {
      icon: <Scale className="h-10 w-10 text-primary" />,
      title: "Legal Rights Visualizer",
      description:
        "Understand your legal rights in simple language with interactive visualizations.",
      link: "/rights",
    },
  ];

  const testimonials = [
    {
      name: "Sayan Ghosh",
      role: "Small Business Owner",
      content:
        "LegalEase helped me understand my rights as a business owner without expensive legal consultations. The AI chatbot answered all my questions clearly.",
    },
    {
      name: "Shriya Banerjee",
      role: "Tenant",
      content:
        "I was having issues with my landlord and didn't know my rights. The Rights Visualizer made everything clear, and I was able to resolve my dispute quickly.",
    },
    {
      name: "Prabuddha Datta",
      role: "Student",
      content:
        "As a law student, I find LegalEase incredibly useful for research. The platform simplifies complex legal concepts and makes them accessible to everyone.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="w-full py-16 md:py-28 lg:py-36 relative overflow-hidden bg-background">
        {/* Diagonal grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, hsl(var(--primary)) 0px, hsl(var(--primary)) 1px, transparent 1px, transparent 60px)",
          }}
        />
        {/* Centre radial glow */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08)_0%,transparent_65%)]" />

        <div className="container px-4 md:px-6 relative">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left copy */}
            <motion.div
              className="flex flex-col justify-center space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center w-fit gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs tracking-widest uppercase">
                <Scale className="h-3.5 w-3.5" />
                Justice. Clarity. Access.
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold leading-tight tracking-tight text-foreground">
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"></span>
                  Simplifying Legal Access for All Indians
                </h1>
                <p className="max-w-[560px] text-lg leading-relaxed text-muted-foreground">
                  LegalEase makes the justice system accessible through
                  AI-powered tools, plain language explanations, and
                  personalized guidance.
                </p>
              </div>

              <div className="flex flex-col gap-3 min-[400px]:flex-row pt-2">
                <Link
                  href="/chat"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded 
bg-gradient-to-r from-primary via-primary/60 to-primary/90 
text-primary-foreground font-bold text-sm tracking-widest uppercase
shadow-[0_4px_24px_hsl(var(--primary)/0.35)]
hover:shadow-[0_6px_40px_hsl(var(--primary)/0.6)]
hover:-translate-y-0.5
transition-all duration-200"
                >
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/help"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded border border-primary/45 text-primary font-semibold text-sm tracking-widest uppercase bg-transparent hover:bg-primary/10 hover:border-primary transition-all duration-200"
                >
                  Find Legal Help
                </Link>
              </div>
            </motion.div>

            {/* Right image with corner ornaments */}
            <motion.div
              className="mx-auto lg:mx-0 relative w-full max-w-[520px]"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {/* Corner ornaments */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-primary z-10" />
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-primary z-10" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-primary z-10" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-primary z-10" />

              <div className="relative w-full aspect-[4/3] rounded overflow-hidden border border-primary/25 shadow-[0_0_60px_hsl(var(--primary)/0.12),0_20px_60px_hsl(0_0%_0%/0.3)]">
                <Image
                  src="/image.png"
                  alt="Legal assistance illustration"
                  fill
                  className="object-cover scale-[1.02]"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* ── Mission ───────────────────────────────────────────── */}
      <section className="w-full py-14 md:py-20 bg-background">
        <div className="container px-4 md:px-6">
          <motion.div
            className="mx-auto text-center space-y-5 max-w-[800px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
              <Scale className="h-5 w-5 text-primary" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Our Mission
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              We believe that legal knowledge should be accessible to everyone,
              not just those who can afford expensive lawyers. LegalEase uses AI
              and plain language to demystify the legal system, empowering
              citizens to understand and exercise their rights.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* ── Features ──────────────────────────────────────────── */}
      <section className="w-full py-14 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <p className="text-xs tracking-[0.18em] uppercase text-primary">
              What We Offer
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Core Features
            </h2>
            <p className="max-w-[600px] text-muted-foreground leading-relaxed">
              Powerful tools designed to simplify your legal journey
            </p>
          </div>

          <div className="mx-auto grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 items-stretch max-w-5xl pt-10 md:pt-14">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="group"
              >
                <div className="relative h-full flex flex-col p-8 rounded bg-card border border-border hover:border-primary/50 hover:shadow-[0_8px_40px_hsl(var(--primary)/0.12)] transition-all duration-300 overflow-hidden">
                  {/* Top accent line revealed on hover */}
                  <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="p-3 rounded border border-primary/20 bg-primary/10 w-fit mb-5">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground flex-grow mb-5">
                    {feature.description}
                  </p>
                  <Link
                    href={feature.link}
                    className="inline-flex items-center gap-1.5 text-primary text-xs tracking-widest uppercase font-medium group-hover:gap-3 transition-all duration-200"
                  >
                    Explore
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* ── Testimonials ──────────────────────────────────────── */}
      <section className="w-full py-14 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <p className="text-xs tracking-[0.18em] uppercase text-primary">
              Testimonials
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              What Our Users Say
            </h2>
            <p className="max-w-[600px] text-muted-foreground leading-relaxed">
              Real stories from people who have used LegalEase to navigate their
              legal challenges
            </p>
          </div>

          <div className="mx-auto grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 items-stretch max-w-5xl pt-10 md:pt-14">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
              >
                <div className="relative h-full flex flex-col gap-4 p-7 rounded bg-card border border-border">
                  {/* Decorative quote */}
                  <span className="absolute top-4 right-5 text-5xl leading-none text-primary/15 font-serif select-none">
                    &ldquo;
                  </span>

                  <p className="text-sm leading-[1.8] text-muted-foreground italic flex-grow">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>

                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary font-bold font-serif text-base shrink-0">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">
                        {testimonial.name}
                      </div>
                      <div className="text-xs text-primary/70 tracking-wide">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="w-full py-16 md:py-28 relative overflow-hidden bg-muted/20">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.06)_0%,transparent_65%)]" />

        <div className="container px-4 md:px-6 relative">
          <motion.div
            className="mx-auto flex flex-col items-center justify-center space-y-6 text-center max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Ornamental rule */}
            <div className="flex items-center gap-4 w-full">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/40" />
              <Scale className="h-5 w-5 text-primary" />
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/40" />
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-snug">
                Ready to Simplify Your Legal Journey?
              </h2>
              <p className="max-w-[600px] text-muted-foreground leading-relaxed">
                Join thousands of Indians who are using LegalEase to understand
                their rights and navigate the legal system with confidence.
              </p>
            </div>

            <div className="flex flex-col gap-3 min-[400px]:flex-row pt-2">
              <Link
                href="/chat"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded 
bg-gradient-to-r from-primary via-primary/60 to-primary/90 
text-primary-foreground font-bold text-sm tracking-widest uppercase
shadow-[0_4px_24px_hsl(var(--primary)/0.35)]
hover:shadow-[0_6px_40px_hsl(var(--primary)/0.6)]
hover:-translate-y-0.5
transition-all duration-200"
              >
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/help"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded border border-primary/45 text-primary font-semibold text-sm tracking-widest uppercase bg-transparent hover:bg-primary/10 hover:border-primary transition-all duration-200"
              >
                Find Legal Help
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
              {[
                "No credit card required",
                "Free basic access",
                "Cancel anytime",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-[18px] h-[18px] rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Decorative bottom border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
    </div>
  );
}
