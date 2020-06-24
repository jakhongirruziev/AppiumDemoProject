import { StyleSheet } from "react-native";

import { Colors } from "../../constants";

export const profileScreenStyles = StyleSheet.create({
  avatar: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 16,
    marginRight: 10,
    width: 80
  },
  header: {
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingVertical: 20
  },
  img: {
    borderColor: Colors.grey,
    borderRadius: 50,
    borderWidth: 1,
    height: 80,
    width: 80
  },
  modal: {
    alignSelf: "center",
    borderRadius: 10,
    elevation: 8,
    overflow: "hidden",
    width: 300
  },
  name: {
    color: "#000",
    fontSize: 20,
    fontWeight: "500"
  },
  names: {
    flex: 1,
    margin: 0,
    padding: 0
  },
  panel: {
    backgroundColor: "#fff"
  },
  section: {
    marginBottom: 40
  },
  status: {
    alignItems: "center",
    paddingHorizontal: 10,
    width: 135
  },
  statuslab: {
    fontSize: 18,
    fontWeight: "500",
    marginTop: 4,
    textAlign: "center"
  },
  subname: {
    color: Colors.darkGrey,
    fontSize: 16,
    marginTop: 4
  },
  words: {
    alignItems: "center",
    flex: 3,
    flexDirection: "row"
  },
  wrapper: {
    backgroundColor: Colors.back,
    flex: 1
  }
});
