// Generated from ASI-Research-v1/RESEARCH.md. Do not edit manually.
export const RESEARCH_001 = {
  "title": "The Disclosure Gap",
  "subtitle": "When Public AI Vulnerability Reporting Outlives the Fix",
  "sourceSha256": "ff0e3d1740cd51f3de06bcf71712181acc2d58c44267f224a3667ba23b672d94",
  "wordCount": 1645,
  "sections": [
    {
      "id": "section-1",
      "heading": "Abstract",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Public vulnerability disclosure creates defensive value, but disclosure is not the same as mitigation. This paper examines an author-reported controlled test in which a jailbreak pattern family documented publicly in 2023 remained capable of crossing the tested DeepSeek safety boundary in 2026. The significance is persistence, not novelty: a known pattern could still reach a prohibited outcome."
        },
        {
          "type": "paragraph",
          "text": "The analysis separates that persistence test from a second, author-reported DeepSeek observation of weapons-related technical assistance, and from independent Anthropic reporting. These are distinct evidence tracks, not one experiment or proof of a shared exploit. Operational prompt sequences and dangerous outputs are withheld."
        },
        {
          "type": "paragraph",
          "text": "The disclosure gap is the period between broad public knowledge of an AI failure mode and durable mitigation of the underlying security weakness. The local findings remain author-reported: original captures, exact test metadata, and historical-pattern correspondence await review. Publication does not convert those gaps into verified evidence."
        }
      ]
    },
    {
      "id": "section-2",
      "heading": "The assumption behind vulnerability disclosure",
      "blocks": [
        {
          "type": "paragraph",
          "text": "The defensive purpose of disclosure is to make a weakness actionable for those responsible for securing a system. A public account can help defenders formulate tests, examine assumptions, and assess whether a mitigation addresses the failure that matters. Publication is a means toward risk reduction, not the endpoint."
        },
        {
          "type": "paragraph",
          "text": "That purpose depends on mitigation catching up. Knowing the name of an attack, recognizing an example, or refusing a previously published prompt is not equivalent to preventing the outcome. A useful closure claim explains which boundary changed, what conditions were tested, and what uncertainty remains."
        },
        {
          "type": "paragraph",
          "text": "Our concern is therefore not that vulnerability research should stay secret. It is that disclosure and demonstrated mitigation should be tracked as separate milestones. A later failure also needs careful interpretation: recurrence does not establish uninterrupted exposure, and the age of a pattern is not the age of a vendor-specific vulnerability."
        }
      ]
    },
    {
      "id": "section-3",
      "heading": "A 2023 pattern, tested again in 2026",
      "blocks": [
        {
          "type": "paragraph",
          "text": "On April 13, 2023, Matt Burgess's WIRED article covered jailbreak research associated with Alex Polyakov and Adversa AI. It is the historical reporting that motivated this investigation, not evidence of a later DeepSeek result. [1](https://www.wired.com/story/chatgpt-jailbreak-generative-ai-hacking/)"
        },
        {
          "type": "paragraph",
          "text": "Adversa AI's original publication, also dated April 13, 2023, provides the primary historical research reference. Its broad title is retained in the references for attribution, not adopted as an ASI claim about transferability. [2](https://adversa.ai/blog/universal-llm-jailbreak-chatgpt-gpt-4-bard-bing-anthropic-and-beyond/)"
        },
        {
          "type": "paragraph",
          "text": "Approximately three years later, the author reports testing the underlying pattern family against DeepSeek in a controlled 2026 interaction. The reported finding is narrow:"
        },
        {
          "type": "quote",
          "text": "A publicly documented jailbreak pattern remained capable of crossing the tested DeepSeek safety boundary in 2026."
        },
        {
          "type": "paragraph",
          "text": "This is a persistence claim about a pattern family, not a claim that the exact 2023 prompt worked verbatim. It is not a new jailbreak discovery. The research question is whether a publicly knowable strategy remained usable under the tested conditions."
        },
        {
          "type": "paragraph",
          "text": "The public package does not yet independently substantiate that result. Original captures, exact date, model/version, interface, run count, and the basis for identifying the historical pattern require review. The four supplied gallery images carry AI-generation provenance metadata and are illustrative, not original test captures. Neither their labels nor their layout proves the withheld result. These limitations are recorded in the [methodology](METHODOLOGY.md) and [evidence register](evidence/README.md)."
        }
      ]
    },
    {
      "id": "section-4",
      "heading": "Why persistence matters more as capability increases",
      "blocks": [
        {
          "type": "paragraph",
          "text": "A boundary failure must be assessed in relation to what it exposes. The ability to obtain a disallowed sentence is not the same consequence as access to specialized technical assistance or an action-capable tool. Reliability and consequence are separate dimensions of the security assessment."
        },
        {
          "type": "paragraph",
          "text": "In a separate 2026 interaction, the author reports that DeepSeek provided weapons-related technical assistance after a safety boundary was bypassed. This observation is included to explain potential consequence, not to supply a replication path or prove that every jailbreak produces the same result. No operational details are published, and the correctness or practical feasibility of the output was not established by this publication."
        },
        {
          "type": "paragraph",
          "text": "Anthropic's Frontier Red Team independently reports progress on simulated tactical-intelligence and conventional-weapons tasks, including work associated with specialized human expertise. Those evaluations concern capability under specified conditions; they do not validate the local experiment or establish real-world operational success. [4](https://www.anthropic.com/research/intelligence-targeting-conventional-weapons-capabilities)"
        },
        {
          "type": "paragraph",
          "text": "Our inference is that leaving a failure family partially mitigated can become more consequential as the assistance available behind the boundary improves. That argument does not require claiming that a model acts with independent harmful intent."
        }
      ]
    },
    {
      "id": "section-5",
      "heading": "Anthropic's September 2026 findings",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Anthropic's September report describes six conventional-weapons cases across China, Russia, and Yemen. In its Yemen case, the provider describes a guided-rocket effort using Claude for guidance, navigation and control software, simulation, firmware work, and post-test diagnosis. It reports that actors split work across sessions and concealed objectives to circumvent safeguards. A field test apparently failed; Anthropic says it has no evidence that the actors fielded an operational device. [3](https://www.anthropic.com/threat-intelligence-report-september-2026)"
        },
        {
          "type": "paragraph",
          "text": "Anthropic reports banning associated accounts, incorporating investigative findings into safeguards, and introducing classifiers intended to detect and block weapons-development traffic. These are the provider's findings and response claims, not an independent ASI investigation. [3](https://www.anthropic.com/threat-intelligence-report-september-2026)"
        },
        {
          "type": "paragraph",
          "text": "The cases provide real-world context for the consequence question. They do not establish the mechanism, repeatability, or validity of the DeepSeek tests."
        }
      ]
    },
    {
      "id": "section-6",
      "heading": "Different attacks, converging consequence",
      "blocks": [
        {
          "type": "paragraph",
          "text": "The DeepSeek experiment and Anthropic's threat cases involved different models, actors, environments, methods, and objectives at intermediate stages. The controlled persistence test asked whether a known pattern family could recur. The separate consequence observation concerned the assistance encountered after a boundary crossing. The external investigations concerned other actors pursuing their own objectives."
        },
        {
          "type": "paragraph",
          "text": "There is no evidence that Anthropic's actors used the jailbreak tested here. This paper does not assign them the same attack class. It also does not claim that public reporting caused their misuse."
        },
        {
          "type": "paragraph",
          "text": "The connection is at the consequence layer: different security failures can converge on access to consequential technical assistance that safety systems are intended to restrict. This is an analytical comparison, not a shared-exploit attribution. Keeping those levels separate prevents external reporting from lending false verification to an unrelated experiment."
        }
      ]
    },
    {
      "id": "section-7",
      "heading": "The disclosure gap",
      "blocks": [
        {
          "type": "paragraph",
          "text": "We define the disclosure gap as:"
        },
        {
          "type": "quote",
          "text": "The period between broad public knowledge of an AI failure mode and durable mitigation of the underlying security weakness."
        },
        {
          "type": "paragraph",
          "text": "This definition is not a measurement of DeepSeek's patch delay. The research does not establish when DeepSeek first became exposed, continuous vulnerability since 2023, or a verified closure date. The subtitle does not allege failure of a vendor-announced fix."
        },
        {
          "type": "paragraph",
          "text": "For model-mediated behavior, a closure claim may need more than a conventional \"fixed in version X\" boundary. The defensive test surface includes prompt variation, task decomposition, session splitting, role framing, context manipulation, and the boundary between a model and its tools. These are conceptual dimensions for authorized evaluation, not a sequence of bypass instructions."
        },
        {
          "type": "paragraph",
          "text": "The important question is not only \"Was this exact prompt patched?\" It is \"Can an adversary still reach the prohibited objective?\" A refusal on one input can be useful evidence, but it does not establish containment across that broader surface. Durable mitigation needs a defined scope, representative testing, and reassessment when the model, permissions, or surrounding system changes."
        }
      ]
    },
    {
      "id": "section-8",
      "heading": "AI safety as security engineering",
      "blocks": [
        {
          "type": "paragraph",
          "text": "A refusal is model behavior. A security boundary is architecture."
        },
        {
          "type": "paragraph",
          "text": "Our recommendation is to retain model-level safeguards while making consequential permissions independently enforceable. Authorization outside the model should determine what a workload can do, rather than accepting the model's assertion that an action is permitted. Least privilege and scoped credentials reduce the authority available if a decision fails."
        },
        {
          "type": "paragraph",
          "text": "Sandboxing can constrain execution. Tool policy can enforce limits at the point of action. Provenance can help preserve the distinction between external content and trusted instructions. These controls address different parts of a system; none is validated by this paper simply because it is recommended."
        },
        {
          "type": "paragraph",
          "text": "Monitoring should examine relevant misuse patterns while respecting privacy and retention limits. Human approval should be attached to clearly defined consequential actions, with enough context for meaningful review. Repeated, authorized adversarial testing should revisit known attack classes as well as new findings."
        },
        {
          "type": "paragraph",
          "text": "These architectural controls can limit agent actions. They do not, by themselves, prevent a text-only model from providing harmful information. Defensive evaluation must therefore distinguish output safeguards from tool authorization and avoid presenting either as a complete solution."
        }
      ]
    },
    {
      "id": "section-9",
      "heading": "What this paper does not claim",
      "blocks": [
        {
          "type": "list",
          "ordered": false,
          "items": [
            "It does not claim that every model is vulnerable or that every historical jailbreak remains viable.",
            "It does not establish verbatim reuse of a 2023 prompt, uninterrupted exposure, present-day DeepSeek vulnerability, or failure of an announced fix.",
            "It does not claim that the DeepSeek tests and Anthropic's cases used the same jailbreak or attack class.",
            "It does not claim that public disclosure caused misuse, or that safety has not improved.",
            "It does not establish independent reproduction, a success rate, or population-level prevalence.",
            "It does not prove the correctness or feasibility of the separate weapons-related output.",
            "It does not claim that AI systems autonomously chose to develop weapons.",
            "It does not validate a product, certify a mitigation, or upgrade any product's evidence status.",
            "It does not publish operational prompts, dangerous outputs, or actionable bypass procedures."
          ]
        },
        {
          "type": "paragraph",
          "text": "Original screenshots may exist in the author's possession, but they have not been supplied to this publication workflow. The public gallery is illustrative. Exact test metadata and the relationship to the historical pattern remain unresolved; the local results are consequently attributed to the author rather than described as independently verified."
        }
      ]
    },
    {
      "id": "section-10",
      "heading": "Conclusion",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Public disclosure is valuable when it helps defenders identify, test, and contain a weakness. The reported DeepSeek finding asks whether an old, public pattern family can still reach a prohibited objective. Its significance is not novelty, but the possibility that familiarity with a failure has been mistaken for closure."
        },
        {
          "type": "paragraph",
          "text": "The separate consequence observation and independent external reporting explain why that question deserves attention. They do not prove the same exploit was used, and they do not fill the local evidence gaps. The publication's claim remains scoped to the author's reported test, with those gaps visible."
        },
        {
          "type": "paragraph",
          "text": "Known does not mean fixed. Published does not mean mitigated. Refusal alone is not a security boundary."
        }
      ]
    },
    {
      "id": "section-11",
      "heading": "References",
      "blocks": [
        {
          "type": "list",
          "ordered": true,
          "items": [
            "Matt Burgess. [The Hacking of ChatGPT Is Just Getting Started](https://www.wired.com/story/chatgpt-jailbreak-generative-ai-hacking/). WIRED, April 13, 2023. Historical reporting; secondary to the underlying research.",
            "Adversa AI. [Universal LLM Jailbreak: ChatGPT, GPT-4, BARD, BING, Anthropic, and Beyond](https://adversa.ai/blog/universal-llm-jailbreak-chatgpt-gpt-4-bard-bing-anthropic-and-beyond/). April 13, 2023. Primary historical research; the title's breadth is not ASI's claim.",
            "Anthropic. [Detecting and countering misuse of AI: September 2026](https://www.anthropic.com/threat-intelligence-report-september-2026). September 2026. Primary provider threat intelligence; conventional-weapons section and GTG-87001.",
            "Anthropic Frontier Red Team. [Measuring tactical intelligence targeting and conventional weapons capabilities of AI models](https://www.anthropic.com/research/intelligence-targeting-conventional-weapons-capabilities). September 10, 2026. Primary capability evaluation.",
            "ASI Research. [ASI Research 001 canonical repository](https://github.com/holeyfield33-art/ASI-Research-v1). Publication artifact and author-reported local findings, not independent verification."
          ]
        },
        {
          "type": "paragraph",
          "text": "External sources reviewed September 14, 2026. See [attribution](ATTRIBUTION.md) for source roles, research affiliation, and verification limits."
        }
      ]
    }
  ]
} as const;
