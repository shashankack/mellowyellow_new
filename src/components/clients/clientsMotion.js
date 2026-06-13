export const clientsEase = [0.22, 1, 0.36, 1];

export const clientsFadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: clientsEase },
  },
};

export const clientsStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
