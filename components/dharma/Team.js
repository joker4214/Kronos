import styles from '@/styles/dharma.module.css';
import { TEAM } from './data';
import TeamAvatar from './TeamAvatar';
import Reveal from './Reveal';

export default function Team() {
  return (
    <section id="team" className={`${styles.section} ${styles.team}`}>
      <Reveal className={styles.sectionHead}>
        <div className={styles.sectionEyebrow}>Our Team</div>
        <h2>The people behind the work</h2>
      </Reveal>
      <div className={styles.teamGrid}>
        {TEAM.map((member, index) => (
          <Reveal key={member.name} delay={index * 0.08} className={styles.teamCard}>
            <div className={styles.avatar}>
              <TeamAvatar
                photo={member.photo}
                name={member.name}
                initial={member.initial || member.name[0]}
              />
            </div>
            <h3>{member.name}</h3>
            {member.role && (
              <p className={member.roleAccent ? styles.roleAccent : undefined}>{member.role}</p>
            )}
            {member.contacts && member.contacts.length > 0 ? (
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {member.contacts.map((c, i) => (
                  <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px' }}>
                    {c.label}
                  </a>
                ))}
              </div>
            ) : member.contact ? (
              <p>
                <a href={member.contact.href} target="_blank" rel="noopener noreferrer">
                  {member.contact.label}
                </a>
              </p>
            ) : null}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
