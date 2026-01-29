import styles from "./SingleApplication.module.css";
import { Application } from "./Applications";

const formatCurrency = (amount: number): string => {
  return `£${amount.toLocaleString("en-GB")}`;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const SingleApplication = ({ application }: { application: Application }) => {
  return (
    <div className={styles.SingleApplication}>
      <div className={styles.cell}>
        <span className={styles.label}>Company</span>
        {application.company}
      </div>
      <div className={styles.cell}>
        <span className={styles.label}>Name</span>
        {application.first_name} {application.last_name}
      </div>
      <div className={styles.cell}>
        <span className={styles.label}>Email</span>
        <a href={`mailto:${application.email}`} className={styles.emailLink}>
          {application.email}
        </a>
      </div>
      <div className={styles.cell}>
        <span className={styles.label}>Loan amount</span>
        {formatCurrency(application.loan_amount)}
      </div>
      <div className={styles.cell}>
        <span className={styles.label}>Application date</span>
        {formatDate(application.date_created)}
      </div>
      <div className={styles.cell}>
        <span className={styles.label}>Expiry date</span>
        {formatDate(application.expiry_date)}
      </div>
    </div>
  );
};

export default SingleApplication;
