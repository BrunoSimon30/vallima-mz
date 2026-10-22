import { motion, useReducedMotion } from "framer-motion";
import { IceDrops } from "@/components/IceDrops";

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
  place: "Sector 49, Korangi, Karachi",
  phones: [
    { label: "0345-3031174", tel: "+923453031174", role: "WhatsApp" },
    { label: "0310-2771112", tel: "+923102771112", role: "Call" },
  ],
  mapQuery: "Velora Banquet",
};

const ease = [0.22, 1, 0.36, 1] as const;

export function Invitation() {
  const reduce = useReducedMotion();

  const item = reduce
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
      };

  const whatsappText = `Assalamualaikum, I would like to confirm my attendance for the Valima of ${EVENT.groom} and ${EVENT.bride}, In Sha Allah.`;
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(EVENT.mapQuery)}`;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(EVENT.mapQuery)}&z=16&output=embed`;

  const facts = [
    {
      title: "Date",
      value: "Saturday\n12 December 2026",
      note: "Keep this Saturday evening free.",
    },
    {
      title: "Time",
      value: EVENT.time,
      note: "Arrive at 9. The reception ends at midnight.",
    },
    {
      title: "Venue",
      value: EVENT.venue,
      note: EVENT.place,
    },
    {
      title: "RSVP",
      value: "0345-3031174",
      note: "Or call 0310-2771112.",
    },
  ];

  return (
    <div className="invite-night min-h-dvh">
      {reduce ? null : <IceDrops />}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: reduce ? 0 : 0.06,
              delayChildren: reduce ? 0 : 0.06,
            },
          },
        }}
      >
        <motion.section variants={item} className="mx-auto max-w-3xl px-5 pb-16 pt-20 text-center sm:px-8 sm:pb-20 sm:pt-24">
          <p className="font-arabic text-3xl leading-[1.9] text-emerald sm:text-4xl">{EVENT.bismillah}</p>
          <p className="mx-auto mt-3 max-w-md text-balance text-base leading-relaxed text-ink-soft">
            In the Name of Allah, the Most Gracious, the Most Merciful
          </p>
          <p className="mx-auto mt-8 max-w-xl text-balance font-display text-2xl italic leading-[1.3] pb-1 text-ink">
            With the Grace and Blessings of Almighty Allah, {EVENT.hosts} cordially request the
            pleasure of your company at the Valima Reception of their beloved son.
          </p>
          <h1 className="mt-10 font-display text-5xl italic font-medium leading-[1.08] pb-1 text-ink sm:text-7xl">
            {EVENT.groom}
          </h1>
          <p className="mt-2 font-display text-2xl italic text-emerald">with</p>
          <h2 className="font-display text-5xl italic font-medium leading-[1.08] pb-1 text-ink sm:text-7xl">
            {EVENT.bride}
          </h2>
          <p className="mx-auto mt-8 max-w-md text-balance text-lg leading-relaxed text-ink-soft">
            Your presence and blessings will add joy to this auspicious occasion.
          </p>
        </motion.section>

        <motion.section
          variants={item}
          aria-labelledby="evening-heading"
          className="invite-band border-y"
        >
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
            <h2 id="evening-heading" className="font-display text-4xl italic leading-[1.15] pb-1 text-ink">
              The evening
            </h2>
            <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {facts.map((fact, index) => (
                <div
                  key={fact.title}
                  className={
                    index === 0
                      ? ""
                      : "lg:border-l lg:border-[oklch(0.62_0.08_162/0.32)] lg:pl-8"
                  }
                >
                  <h3 className="text-sm text-emerald">{fact.title}</h3>
                  <p className="mt-2 whitespace-pre-line font-display text-[1.65rem] leading-tight text-ink">
                    {fact.value}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{fact.note}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          variants={item}
          className="grid border-t border-[oklch(0.62_0.08_162/0.32)] lg:grid-cols-2"
        >
          <div className="flex flex-col px-5 py-10 sm:px-10 lg:px-16 lg:py-12">
            <h2 className="font-display text-4xl italic leading-[1.15] pb-1 text-ink">Please reply</h2>
            <p className="mt-3 max-w-md text-base leading-relaxed text-ink-soft">
              A call or a WhatsApp message is enough. The family would like to know you are coming.
            </p>
            <div className="mt-8 flex max-w-sm flex-col">
              {EVENT.phones.map((phone) => (
                <a
                  key={phone.tel}
                  href={`tel:${phone.tel}`}
                  className="flex items-baseline justify-between gap-4 border-b border-[oklch(0.62_0.08_162/0.28)] py-3"
                >
                  <span className="invite-phone">{phone.label}</span>
                  <span className="text-sm text-ink-soft">{phone.role}</span>
                </a>
              ))}
            </div>
            <a
              href={`https://wa.me/${EVENT.phones[0].tel.replace(/\D/g, "")}?text=${encodeURIComponent(whatsappText)}`}
              className="invite-cta mt-8 w-full max-w-xs"
            >
              Confirm on WhatsApp
            </a>
          </div>
          <div className="flex min-h-[520px] flex-col border-t border-[oklch(0.62_0.08_162/0.32)] bg-[oklch(0.18_0.042_255)] lg:min-h-[640px] lg:border-t-0 lg:border-l">
            <div className="flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-6">
              <div>
                <h2 id="map-heading" className="font-display text-3xl italic leading-[1.15] pb-1 text-ink">
                  {EVENT.venue}
                </h2>
                <p className="text-sm leading-relaxed text-ink-soft">
                  {EVENT.place}. The pin is the hall.
                </p>
              </div>
              <a
                href={mapHref}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 text-sm font-medium text-emerald underline decoration-(--emerald)/40 underline-offset-4 hover:decoration-(--emerald)"
              >
                Open in Google Maps
              </a>
            </div>
            <div className="relative min-h-[420px] flex-1 overflow-hidden">
              <iframe
                title="Map of Velora Banquet in Sector 49, Korangi, Karachi"
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute -top-56 left-0 h-[calc(100%+14rem)] w-full border-0"
              />
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}

export const EVENT_DATE = EVENT.date;
export const EVENT_TITLE = `${EVENT.groom} & ${EVENT.bride}`;
export const EVENT_LABEL = EVENT.type;
export const EVENT_URDU = EVENT.typeUrdu;
