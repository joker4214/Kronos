import styles from '@/styles/dharma.module.css';
import { TEAM } from './data';
import TeamAvatar from './TeamAvatar';

export default function Team() {
  return (
    <section id="team" className={`${styles.section} ${styles.team}`}>
      <div className={styles.sectionHead}>
        <div className={styles.sectionEyebrow}>Our Team</div>
        <h2>The people behind the work</h2>
      </div>
      <div className={styles.teamGrid}>
        {TEAM.map((member) => (
          <div key={member.name} className={styles.teamCard}>
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
            {member.contact && (
              <p>
                <a href={member.contact.href} target="_blank" rel="noopener noreferrer">
                  {member.contact.label}
                </a>
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
