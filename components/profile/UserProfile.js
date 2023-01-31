import ProfileForm from "./ProfileForm";
import styles from "./UserProfile.module.css";

function UserProfile() {
  // Redirect away if NOT auth

  return (
    <section className={styles.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
