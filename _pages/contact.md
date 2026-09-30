---
layout: page
title: "Contact"
permalink: /contact/
description: "Contactez L'Atelier du Dirigeant — Une question, une suggestion d'article ou un partenariat ?"
---

Vous avez une question, une idée d'article ou une proposition de partenariat ? Écrivez-nous.

<form class="contact-form" name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="contact" />
  <p style="display:none"><label>Ne pas remplir : <input name="bot-field" /></label></p>
  <div class="contact-form__group">
    <label class="contact-form__label" for="contact-name">Votre nom *</label>
    <input type="text" id="contact-name" name="name" required placeholder="Jean Dupont" class="contact-form__input" />
  </div>
  <div class="contact-form__group">
    <label class="contact-form__label" for="contact-email">Votre email *</label>
    <input type="email" id="contact-email" name="email" required placeholder="jean@moncommerce.fr" class="contact-form__input" />
  </div>
  <div class="contact-form__group">
    <label class="contact-form__label" for="contact-subject">Sujet *</label>
    <select id="contact-subject" name="subject" required class="contact-form__input">
      <option value="">— Choisissez un sujet —</option>
      <option value="suggestion">Suggestion d'article</option>
      <option value="question">Question sur un article</option>
      <option value="partenariat">Proposition de partenariat</option>
      <option value="temoignage">Témoignage / retour d'expérience</option>
      <option value="autre">Autre</option>
    </select>
  </div>
  <div class="contact-form__group">
    <label class="contact-form__label" for="contact-message">Votre message *</label>
    <textarea id="contact-message" name="message" required rows="6" placeholder="Décrivez votre demande…" class="contact-form__input contact-form__textarea"></textarea>
  </div>
  <button type="submit" class="btn btn--gold btn--lg btn--full">Envoyer le message →</button>
</form>

<style>
.contact-form { display: flex; flex-direction: column; gap: 1.25rem; margin-top: 2rem; max-width: 600px; }
.contact-form__group { display: flex; flex-direction: column; gap: 0.4rem; }
.contact-form__label { font-size: var(--text-sm); font-weight: 600; color: var(--navy); }
.contact-form__input { padding: 0.75rem 1rem; border: 1.5px solid var(--mid-gray); border-radius: var(--radius-md); font-size: var(--text-base); font-family: var(--font-sans); color: var(--text-dark); background: var(--white); transition: border-color var(--transition); }
.contact-form__input:focus { outline: none; border-color: var(--gold); box-shadow: 0 0 0 3px rgba(201,168,76,.15); }
.contact-form__textarea { resize: vertical; min-height: 140px; }
</style>