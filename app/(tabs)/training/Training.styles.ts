import { StyleSheet } from "react-native";

export const trainingStyles = StyleSheet.create({
  /* Layout */
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 15,
    backgroundColor: "#F8F8F8",
  },
  progress: {
    alignSelf: "flex-end",
    marginBottom: 8,
  },
  card: {
    backgroundColor: "#fcfcfc",
    paddingVertical: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 3,
  },
  cardWrap: {
    paddingHorizontal: 22,
  },
  wordBlock: {
    borderTopWidth: 1,
    borderTopColor: "#dbdbdb",
    paddingTop: 22,
  },
  nextWrap: {
    flexDirection: "row",
    gap: 8,
  },

  /* Inputs */
  headerInput: {
    fontSize: 16,
    marginBottom: 103,
    color: "#121417",
    fontFamily: "FixelDisplayMedium",
  },

  /* Language rows */
  langRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  lang: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginLeft: "auto",
  },
  langLower: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 103,
    gap: 8,
    justifyContent: "flex-end",
  },
  langText: {
    fontSize: 14,
    color: "#121417",
    fontFamily: "FixelDisplayMedium",
  },

  /* Text styles */
  word: {
    fontSize: 16,
    color: "#121417",
    fontFamily: "FixelDisplayMedium",
  },
  next: {
    fontSize: 16,
    color: "rgba(18, 20, 23, 0.5)",
    fontFamily: "FixelDisplayMedium",
  },
  nextDisabled: {
    opacity: 0.4,
  },
  finishText: {
    marginTop: 40,
    fontSize: 22,
    textAlign: "center",
  },

  /* Buttons */
  saveBtn: {
    backgroundColor: "#85aa9f",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 8,
    marginTop: 32,
  },
  saveBtnDisabled: {
    backgroundColor: "#b7c9c3",
  },
  saveText: {
    color: "#fcfcfc",
    fontSize: 16,
    fontFamily: "FixelDisplayBold",
  },
  cancel: {
    textAlign: "center",
    color: "rgba(18, 20, 23, 0.5)",
    fontFamily: "FixelDisplayBold",
    fontSize: 16,
  },
});
