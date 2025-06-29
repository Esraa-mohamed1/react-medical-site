import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import styles from "../style/TipsAndFaqSection.module.css";
import { useTranslation } from "react-i18next"; // Importing useTranslation hook

const tips = [
  {
    id: 1,
    titleKey: "problemWithSocialInsurance",
    date: "December 14th, 2021",
    author: "Admin",
  },
  {
    id: 2,
    titleKey: "coachingSecrets",
    date: "Sep 17th, 2021",
    author: "Torres",
  },
  {
    id: 3,
    titleKey: "strategyPlanning",
    date: "May 15th, 2021",
    author: "Admin",
  },
];

const faqs = [
  {
    id: 1,
    questionKey: "canGetDivorce",
    answerKey: "divorceAnswer",
  },
  {
    id: 2,
    questionKey: "technicalSupportQuestion",
    answerKey: "technicalSupportAnswer",
  },
  {
    id: 3,
    questionKey: "compatibleServicesQuestion",
    answerKey: "compatibleServicesAnswer",
  },
  {
    id: 4,
    questionKey: "hiringQuestion",
    answerKey: "hiringAnswer",
  },
];

export default function TipsAndFaqSection() {
  const { t } = useTranslation();  // Using the translation hook
  const [openFaq, setOpenFaq] = useState(1);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Tips & Tricks */}
          <div>
            <h2 className={styles.sectionTitle}>
              <span className={styles.titleHighlight}>{t('tipsAndFaqSection.tipsAndTricksTitle')}</span>
            </h2>

            <div className={styles.tipsContainer}>
              {tips.map((tip) => (
                <div key={tip.id} className={styles.tipItem}>
                  <div className={styles.tipContent}>
                    <h3>{t(`tipsAndFaqSection.${tip.titleKey}`)}</h3>
                    <p className={styles.tipMeta}>
                      {tip.date} by <span>{tip.author}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div>
            <h2 className={styles.sectionTitle}>
              <span className={styles.titleHighlight}>{t('tipsAndFaqSection.faqTitle')}</span>
            </h2>

            <div className={styles.faqContainer}>
              {faqs.map((faq) => (
                <div key={faq.id} className={styles.faqItem}>
                  <div className={styles.faqHeader}>
                    <button onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)} className={styles.faqButton}>
                      <span className={styles.faqQuestion}>{t(`tipsAndFaqSection.${faq.questionKey}`)}</span>
                      {openFaq === faq.id ? (
                        <ChevronUp className={`w-5 h-5 ${styles.faqIcon}`} />
                      ) : (
                        <ChevronDown className={`w-5 h-5 ${styles.faqIcon}`} />
                      )}
                    </button>
                    {openFaq === faq.id && (
                      <div className={styles.faqContent}>
                        <p className={styles.faqAnswer}>{t(`tipsAndFaqSection.${faq.answerKey}`)}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
