import './ContactSection.css'

function ContactSection() {
    return (
        <section className="contact-section" aria-labelledby="contact-section-heading">
            <div className="contact-section__content">
                <p className="contact-section__eyebrow">Contact</p>
                <h2 id="contact-section-heading">Let&apos;s Connect</h2>
                <p>
                    Have a project, role, collaboration, or question in mind? Send me a message and I&apos;ll get back to you.
                </p>
            </div>

            <form
                className="contact-section__form"
                id="fs-frm"
                name="simple-contact-form"
                acceptCharset="utf-8"
                action="https://formspree.io/f/mlderkrv"
                method="POST"
            >
                <fieldset className="contact-section__fieldset" id="fs-frm-inputs">
                    <label htmlFor="full-name">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        id="full-name"
                        placeholder="First and Last"
                        required
                    />

                    <label htmlFor="email-address">Email Address</label>
                    <input
                        type="email"
                        name="_replyto"
                        id="email-address"
                        placeholder="email@domain.tld"
                        required
                    />

                    <label htmlFor="message">Message</label>
                    <textarea
                        rows="5"
                        name="message"
                        id="message"
                        placeholder="Tell me a little about what you're reaching out about."
                        required
                    />

                    <input
                        type="hidden"
                        name="_subject"
                        id="email-subject"
                        value="Contact Form Submission"
                    />
                </fieldset>

                <button className="contact-section__submit" type="submit">
                    Send Message
                </button>
            </form>
        </section>
    )
}

export default ContactSection
