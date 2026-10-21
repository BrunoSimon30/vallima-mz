import { motion, useReducedMotion } from "framer-motion";

const EVENT = {
  type: "Valima Reception",
  typeUrdu: "ولیمہ",
  bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
  hosts: "Mr. & Mrs. Naseem Akhter",
  groom: "Muhammad Hassan",
  bride: "Kanwal Fatima",
  date: "Saturday, 12 December 2026",
  time: "9 PM to 12 AM",
  venue: "Velora Banquet",
  phones: [
    { label: "0345-3031174", tel: "+923453031174" },
    { label: "0310-2771112", tel: "+923102771112" },
  ],
  mapQuery: "Velora Banquet",
};

const ease = [0.22, 1, 0.36, 1] as const;

const details = [
  { label: "Date", value: EVENT.date },
  { label: "Time", value: EVENT.time },
  { label: "Venue", value: EVENT.venue },
];

export function Invitation() {
  const reduce = useReducedMotion();

  const item = reduce
    ? {
        hidden: { opacity: 1, y: 0 },
        show: { opacity: 1, y: 0 },
      }
    : {
        hidden: { opacity: 0, y: 16 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease },
        },
      };

  const whatsappText = `Assalamualaikum, I would like to confirm my attendance for the Valima of ${EVENT.groom} and ${EVENT.bride}, In Sha Allah.`;

  return (
    <div className="relative flex min-h-[100dvh] items-start justify-center overflow-x-hidden px-4 pb-10 pt-24 sm:items-center sm:px-6 sm:pb-12 sm:pt-16">
      <div className="card-room absolute inset-0 -z-10" aria-hidden />

      <motion.article
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: reduce ? 0 : 0.055,
              delayChildren: reduce ? 0 : 0.08,
            },
          },
        }}
        className="invite-card w-full max-w-[26.5rem]"
      >
        <span className="invite-corner invite-corner-tl" aria-hidden />
        <span className="invite-corner invite-corner-tr" aria-hidden />
        <span className="invite-corner invite-corner-bl" aria-hidden />
        <span className="invite-corner invite-corner-br" aria-hidden />

        <motion.p variants={item} className="font-arabic text-xl leading-[1.9] text-emerald sm:text-2xl">
          {EVENT.bismillah}
        </motion.p>
        <motion.p
          variants={item}
          className="mx-auto mt-3 max-w-[28ch] text-[0.8rem] leading-relaxed text-ink-soft"
        >
          In the Name of Allah, the Most Gracious, the Most Merciful
        </motion.p>

        <motion.div variants={item} className="invite-rule" aria-hidden />

        <motion.p
          variants={item}
          className="font-display text-[1.05rem] italic leading-[1.2] pb-1 text-ink"
        >
          With the Grace and Blessings of Almighty Allah,
        </motion.p>
        <motion.p variants={item} className="mt-4 font-display text-2xl leading-tight text-ink">
          {EVENT.hosts}
        </motion.p>
        <motion.p
          variants={item}
          className="mx-auto mt-4 max-w-[34ch] text-[0.95rem] leading-relaxed text-ink-soft"
        >
          cordially request the pleasure of your company at the Valima Reception of their
          beloved son
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-7 font-display text-[2.55rem] italic font-medium leading-[1.12] pb-1 text-ink sm:text-5xl"
        >
          {EVENT.groom}
        </motion.h1>
        <motion.p variants={item} className="mt-1 font-display text-lg italic text-emerald">
          with
        </motion.p>
        <motion.h2
          variants={item}
          className="mt-1 font-display text-[2.55rem] italic font-medium leading-[1.12] pb-1 text-ink sm:text-5xl"
        >
          {EVENT.bride}
        </motion.h2>

        <motion.div variants={item} className="invite-rule" aria-hidden />

        <motion.p
          variants={item}
          className="mx-auto max-w-[32ch] text-[0.95rem] leading-relaxed text-ink-soft"
        >
          Your presence and blessings will add joy to this auspicious occasion.
        </motion.p>

        <motion.dl variants={item} className="mt-7 space-y-4">
          {details.map((row) => (
            <div key={row.label}>
              <dt className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-emerald">
                {row.label}
              </dt>
              <dd className="mt-1 font-display text-xl leading-snug text-ink">
                {row.label === "Venue" ? (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(EVENT.mapQuery)}`}
                    className="underline decoration-[color:var(--emerald)]/40 underline-offset-4 hover:decoration-[color:var(--emerald)]"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {row.value}
                  </a>
                ) : (
                  row.value
                )}
              </dd>
            </div>
          ))}
        </motion.dl>

        <motion.div variants={item} className="mt-7">
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-emerald">
            RSVP
          </p>
          <div className="mt-3 flex flex-col items-center gap-2">
            {EVENT.phones.map((phone) => (
              <a key={phone.tel} href={`tel:${phone.tel}`} className="invite-phone">
                {phone.label}
              </a>
            ))}
          </div>
          <a
            href={`https://wa.me/${EVENT.phones[0].tel.replace(/\D/g, "")}?text=${encodeURIComponent(whatsappText)}`}
            className="invite-cta mt-5"
          >
            Confirm on WhatsApp
          </a>
        </motion.div>
      </motion.article>
    </div>
  );
}

export const EVENT_TITLE = `${EVENT.groom} & ${EVENT.bride}`;
export const EVENT_LABEL = EVENT.type;
export const EVENT_URDU = EVENT.typeUrdu;
