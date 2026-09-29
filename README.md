# Wylie School of Music Website

Official website for the **Wylie School of Music** ([wylieschoolofmusic.com](https://wylieschoolofmusic.com/)), migrated from Squarespace to **GitHub Pages**.

This repository is designed with a lightweight, intuitive Jekyll structure that runs natively on GitHub Pages with **zero setup or build commands required**. Non-technical collaborators can easily update content, post new articles, and change school contact details directly from GitHub.

---

## 📁 Repository Structure

```text
├── _config.yml              # School contact info, phone, email, address, & social links
├── CNAME                    # Custom domain (wylieschoolofmusic.com)
├── _includes/               # Shared templates (edit once, updates everywhere)
│   ├── head.html            # Meta tags, fonts, Google Tag Manager & Google Ads
│   ├── header.html          # Logo & navigation menu
│   ├── footer.html          # Footer links, social icons, & business info
│   └── form.html            # Reusable secure inquiry form component
├── _layouts/                # Page layouts
│   ├── default.html         # Base shell
│   ├── page.html            # Standard page layout with hero header
│   └── post.html            # Blog post template
├── _posts/                  # Blog articles (written in simple Markdown)
│   └── YYYY-MM-DD-title.md
├── assets/
│   ├── css/style.css        # Clean responsive styles
│   ├── js/main.js           # Mobile menu drawer and form submission script
│   └── images/              # Self-hosted images (logos, teachers, recitals)
├── index.html               # Home page
├── our-story.html           # About the school & owners
├── teachers.html            # Instructor profiles & bios
├── guitar.html              # Guitar lessons
├── piano.html               # Piano lessons
├── drums.html               # Drum lessons
├── bass.html                # Bass lessons
├── voice.html               # Voice lessons
├── violin.html              # Violin lessons
├── bands.html               # Rock Shop band program
├── contact.html             # Contact page with interactive Google Map
├── registration-form.html   # Full student enrollment & policy agreement form
├── school.html              # General PPC ad landing page
├── guitar-1.html            # Guitar ad campaign landing page
├── violin-1.html            # Violin ad campaign landing page
├── thank-you.html           # General inquiry confirmation page
├── thank-you-guitar.html    # Guitar trial confirmation page
├── thank-you-violin.html    # Violin trial confirmation page
└── blog/
    └── index.html           # Blog archive listing all articles
```

---

## 🛠️ How to Manage the Site (Guide for Collaborators)

### 1. Updating Phone Number, Email, or Address
You do not need to search through 30 pages to change contact info. Open `_config.yml` and edit:
```yaml
phone: "(972) 665-8621"
email: "info@wylieschoolofmusic.com"
address: "403 S. Jackson #103"
city_state_zip: "Wylie, TX 75098"
```
When you commit this change, GitHub Pages will automatically update the header, footer, and contact sections across every page.

---

### 2. Adding a New Blog Post
1. Go into the `_posts/` folder.
2. Click **Add file** -> **Create new file**.
3. Name your file in this format: `YYYY-MM-DD-title-of-post.md` (e.g. `2026-10-15-fall-recital-tips.md`).
4. Paste the following header at the very top:
```markdown
---
layout: post
title: "Your Post Title Here"
date: 2026-10-15
featured_image: "/assets/images/your-image.jpg"
excerpt: "A short 1-2 sentence preview of the article."
---

Write your article here using regular text.

You can add subheadings with `## Heading` and bullet lists with `- Item`.
```
5. Click **Commit changes**. Your post will automatically appear on `/blog/` and at its own URL!

---

### 3. Adding or Updating Images
1. Save your image (JPG, PNG, or WebP) into the `assets/images/` directory.
2. Reference it anywhere in your pages or posts as `/assets/images/your-image.jpg`.

---

### 4. Form Security & Activation (FormSubmit)
Inquiries and student registrations use [FormSubmit.co](https://formsubmit.co/) to deliver messages straight to your inbox without requiring a complex backend server.

To protect your inbox from spam bots and hide your real email from public repository scrapers, the forms are equipped with 3 security layers:
1. **Honeypot Trap**: Invisible field `_honey` that drops automated bot submissions.
2. **Domain Lock**: Submissions are strictly locked to `wylieschoolofmusic.com`.
3. **Email Obfuscation (Action Item)**:
   - Visit [https://formsubmit.co/el/](https://formsubmit.co/el/) in your web browser.
   - Enter your email address (`info@wylieschoolofmusic.com`) and click **Submit**.
   - FormSubmit will generate a random secure hash key (e.g. `b12c34df56g7890`).
   - Open `_config.yml` and paste your key into:
     ```yaml
     formsubmit_id: "your-random-hash-key-here"
     ```
   - Commit the change. Your real email address is now 100% hidden from web crawlers.

---

### 5. Custom Domain & DNS Settings
To point `wylieschoolofmusic.com` to GitHub Pages:
1. Log in to your domain registrar (Squarespace Domains, GoDaddy, etc.).
2. Under DNS settings for `wylieschoolofmusic.com`:
   - Set **A Records** for `@` to:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Set **CNAME Record** for `www` to: `<your-github-username>.github.io.`
3. In this repository on GitHub, go to **Settings** -> **Pages**:
   - Source: Deploy from branch `main` / `root`.
   - Custom domain: Ensure `wylieschoolofmusic.com` is entered.
   - Check **Enforce HTTPS**.
