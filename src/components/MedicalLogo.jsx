export default function MedicalLogo({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="28" r="28" fill="white" />
      <circle cx="28" cy="28" r="26" fill="#0F52BA" />
      <path
        d="M28 16C28 16 20 20 20 28C20 33 23 37 28 40C33 37 36 33 36 28C36 20 28 16 28 16Z"
        fill="white"
        opacity="0.12"
      />
      <rect x="25.5" y="20" width="5" height="16" rx="1.5" fill="white" />
      <rect x="20" y="25.5" width="16" height="5" rx="1.5" fill="white" />
    </svg>
  );
}