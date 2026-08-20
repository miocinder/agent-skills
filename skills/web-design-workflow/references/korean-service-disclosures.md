# Korean Service Disclosures

Read this reference only when the current task affects a Korean-facing service's data collection or consent, account creation or deletion, checkout or purchase, subscription, cancellation or refund, footer or policy navigation, or release-readiness review, and the service may handle personal data, create accounts, sell directly to consumers, or use recurring billing. Do not load it for an unrelated marketing, visual, or component change that does not affect those flows or disclosure visibility. This is a design and content-quality checklist, not legal advice. Follow applicable law, approved legal copy, and project-specific requirements.

Do not remove, hide, or dismiss relevant business identity, terms, privacy, subscription, cancellation, refund, or other service disclosures as visual clutter without confirming they are out of scope. Build applicable disclosures and navigation paths into the information architecture instead of adding them as a final visual patch.

## Establish the service facts

Before researching or drafting disclosures, identify:

- the intended launch date, operator location, target users, and jurisdictions;
- whether the service is free, B2B-only, consumer-facing, a direct seller, or an intermediary;
- what personal data enters the service, why it is used, where it is stored, how long it is kept, and who receives or processes it;
- whether it involves children, sensitive or unique identifiers, behavioral data, AI inputs or training, third-party provision, processing vendors, or cross-border transfer;
- what is sold, the full price, taxes and fees, supply method, billing cycle, trial or free-to-paid transition, price-change behavior, cancellation path, refund rules, and support channel;
- which payment gateway, app store, marketplace, identity provider, or other platform contract governs the delivered flow.

Do not assume every item creates the same legal obligation. Use these facts to decide which laws, guidance, contracts, screens, notices, and approvals apply. If a material fact is unknown, record it as an open question rather than guessing.

## When reliable web access is available

Use current official primary sources. Search summaries only to locate an official source, never as the authority for a release decision. Record the direct source URL, document title or provision, publication or effective date, intended launch date, and date checked. Distinguish rules already in force from enacted future changes and non-binding guidance.

Check the following in order and only as relevant to the service facts:

1. **Current and scheduled law:** Use the [Korean Law Information Center](https://www.law.go.kr/) to inspect the current text, subordinate statutes, administrative rules, effective dates, and scheduled amendments. At minimum, test applicability of the Personal Information Protection Act, the Act on the Consumer Protection in Electronic Commerce, and the Act on the Regulation of Terms and Conditions. Check sector-specific law when the service involves regulated payments, finance, health, children, location information, communications, or another regulated field.
2. **Privacy guidance:** Use the [Personal Information Protection Commission](https://www.pipc.go.kr/) and [Privacy Portal](https://www.privacy.go.kr/) to find the current privacy-policy guidance and any applicable guidance for consent or another processing basis, required and optional collection, retention and deletion, data-subject rights, children, behavioral data, third-party provision, processors, cross-border transfer, mobile apps, or AI data use.
3. **Consumer-commerce guidance:** Use the [Korea Fair Trade Commission](https://www.ftc.go.kr/) and current official notices to verify the operator's seller or intermediary role, business identity and transaction disclosures, product or digital-service information, order confirmation, withdrawal, cancellation, termination, refund, dispute handling, and terms presentation. For subscriptions, specifically verify current rules for the initial price and cycle, automatic renewal, trial or free-to-paid conversion, price increases, advance notice or consent, cancellation method, and refund effect.
4. **Registration and sector authorities:** When registration, filing, or displayed registration information may apply, verify the current procedure and exemptions through [Government24](https://www.gov.kr/), the competent local authority, or the named regulator. For a regulated payment or financial function, consult the [Financial Services Commission](https://www.fsc.go.kr/) or [Financial Supervisory Service](https://www.fss.or.kr/); for location or communications features, consult the [Korea Communications Commission](https://www.kcc.go.kr/) and the applicable current law.
5. **Delivered platform rules:** Check the current official documentation and contract for the actual payment gateway, app store, marketplace, identity provider, analytics service, and hosting or cloud vendor. Separate contractual or platform requirements from statutory requirements and verify that the implemented flow can satisfy both.

Translate confirmed requirements into the interface at the correct moment and location. Verify whether the service needs:

- privacy explanations, consent choices, and required-versus-optional distinctions before collection;
- accessible privacy, terms, rights-request, account-deletion, and contact paths;
- current operator identity, registration details, customer support, and transaction terms;
- total price, billing cycle, renewal or conversion terms, cancellation and refund conditions, and confirmation before purchase;
- notices for processors, third-party provision, cross-border transfer, retention, deletion, children, or AI data use;
- durable records of consent, contract confirmation, policy versions, or notices where the confirmed requirement calls for them.

Do not copy a generic legal template as if it proves compliance. Preserve approved legal wording, and send ambiguous applicability or legal interpretation to the appropriate legal or compliance reviewer.

## Fallback when web access is unavailable or unreliable

State that current law and official guidance could not be verified. Do not claim that the draft is compliant, current, legally sufficient, or ready for release.

Inspect the repository and user-provided materials for these sources, in this order:

1. **Approved legal copy and review records:** Existing privacy policies, terms, consent text, commerce disclosures, legal-review decisions, and dated approvals are the strongest available project authority. Preserve their meaning and version markers; do not rewrite them for tone without authorization.
2. **Product and data-flow evidence:** Review product requirements, data inventories, schemas, API contracts, architecture notes, analytics configuration, and vendor lists. This prevents the UI from describing collection, storage, sharing, deletion, or AI use that differs from the real system.
3. **Billing and provider evidence:** Review product pricing, checkout specifications, billing configuration, cancellation and refund behavior, and repository-vendored provider documentation. This grounds the interface in the service's actual price, cycle, transition, payment, and recovery paths.
4. **Existing interface and project rules:** Follow applicable `AGENTS.md`, `README.md`, `DESIGN.md`, approved components, footer routes, account settings, checkout flows, and support paths. Preserve already approved disclosures and ensure redesigns do not make them harder to find.

When required facts or approved wording are still missing:

- keep clearly labeled placeholders for operator identity, contact and registration details, policy owner, effective date, data handling, terms, price, billing cycle, renewal or conversion, cancellation, refund, and support as applicable;
- use a handoff checklist that names each missing fact, the screen or flow it blocks, the source or reviewer needed, and why it affects the interface;
- reserve layout space and working navigation for applicable disclosures, but do not invent company details, registration numbers, legal grounds, policy terms, prices, refund rights, deadlines, or compliance claims;
- do not ship empty links, prechecked consent, hidden cancellation, false urgency, or copy that implies an unverified right or restriction;
- stop short of release-ready legal copy or a consequential purchase flow when missing information could change consent, payment, cancellation, refund, or user-right behavior.

The fallback exists to produce an honest, reviewable information architecture without replacing current legal research. Its output must be labeled as a draft requiring official-source verification and appropriate review.

## Verification

- Confirm that every disclosure and policy statement matches the verified service facts and the source recorded for it.
- Check disclosure visibility and timing in the footer, sign-up, data collection, checkout, purchase confirmation, account settings, cancellation, refund, and rights-request flows as applicable.
- Verify that approved copy remains accessible on mobile and desktop and that required choices work with keyboard and assistive technology.
- Confirm that placeholders and unresolved questions are clearly labeled and excluded from release-ready claims.
- Report the sources checked, their dates, the requirements reflected in the interface, and every remaining legal, product, or implementation uncertainty.
