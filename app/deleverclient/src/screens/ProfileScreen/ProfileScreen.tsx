import React from "react";
import { View } from "react-native";

// import SimpleToast from "react-native-simple-toast";
import L from "../../localization";
// import {
//   EmptyScreen,
//   Label,
//   Loading,
//   Panel,
//   PanelDivider
// } from "../../components";
// import { Colors, host, default_person, no_connection } from "../../constants";
// import { profileScreenStyles } from "./ProfileScreenStyles";
// import { HHMM, isInPeriod, callNumber } from "../../utils";
// import {
//   setDailyReportAsync,
//   setVendorInfoAsync,
//   setOperatorInfoAsync,
//   resetAppState
// } from "../../redux/actions";
// import L from "../../localization";
// import Modal from "react-native-modal";

export function ProfileScreen() {
  // const {
  //   vendor,
  //   fetchingVendor,
  //   errorVendor,
  //   operator,
  //   fetchinOperator,
  //   errorOperator,
  //   setVendorInfoAsync,
  //   setOperatorInfoAsync,
  //   resetAppState
  // } = props;
  // const [updating, setUpdating] = useState(false);
  // const [refreshing, setRefreshing] = useState(false);
  // const [modalOpen, setModalOpen] = useState(false);
  // const { operatorData, isLoading, hasError } = useOperator();

  // const refresh = () => {
  //   setRefreshing(true);
  //   setVendorInfoAsync()
  //     .then((data: any) => {
  //       console.log(data);
  //     })
  //     .catch((e: any) => {
  //       console.dir(e);
  //       console.log(JSON.stringify(e));
  //     })
  //     .finally(() => setRefreshing(false));
  //   setOperatorInfoAsync()
  //     .then((data: any) => {
  //       console.log(data);
  //     })
  //     .catch((e: any) => {
  //       console.dir(e);
  //       console.log(JSON.stringify(e));
  //     })
  //     .finally(() => setRefreshing(false));
  // };

  // useEffect(() => {
  //   if (vendor) {
  //     setUpdating(true);
  //     SimpleToast.show(L.common.syncing);
  //   }
  //   setOperatorInfoAsync()
  //     .then(() => {
  //       setUpdating(false);
  //     })
  //     .catch((e: any) => {
  //       console.dir(e);
  //       console.log(JSON.stringify(e));
  //     });
  //   setVendorInfoAsync()
  //     .then(() => {
  //       setUpdating(false);
  //     })
  //     .catch((e: any) => {
  //       console.dir(e);
  //       console.log(JSON.stringify(e));
  //     });
  // }, []);

  // if (!updating && (fetchinOperator || fetchingVendor)) {
  //   return <Loading size={60} color={Colors.blue} />;
  // }

  // if (errorOperator || errorVendor) {
  //   return (
  //     // @ts-ignore
  //     <FlatList
  //       data={[]}
  //       ListEmptyComponent={
  //         <EmptyScreen
  //           illustration={no_connection}
  //           text={L.errors.network_error}
  //         />
  //       }
  //       refreshing={refreshing}
  //       onRefresh={refresh}
  //     />
  //   );
  // }

  // // const vendor = vendorsData[0]; // TODO: create scenaroi that user could choose its vendor on login
  // const isOpen = isInPeriod(vendor.opens_at, vendor.closes_at); // it once showed incorrect status

  return (
    <View>
      {/* <ScrollView>
        <TouchableWithoutFeedback onPress={() => setModalOpen(true)}>
          <View style={styles.header}>
            <View style={styles.avatar}>
              <Image
                style={styles.img}
                source={
                  vendor.logo ? { uri: host + vendor.logo } : default_person
                }
              />
            </View>
            <View style={styles.words}>
              <View style={styles.names}>
                <Text style={styles.name}>{vendor.company}</Text>
                <Text style={styles.subname}>{vendor.name}</Text>
              </View>
              <View style={styles.status}>
                <Label color="#eee">
                  <Text style={{ color: Colors.darkGrey, fontSize: 15 }}>
                    {`${HHMM(vendor.opens_at)}-${HHMM(vendor.closes_at)}`}
                  </Text>
                </Label>
                <Text
                  style={[
                    styles.statuslab,
                    { color: isOpen ? Colors.green : Colors.red }
                  ]}
                >
                  {isOpen ? L.common.open : L.common.closed}
                </Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <PanelDivider />
        <Panel
          style={styles.panel}
          iconName="account-box"
          title={L.common.id_number}
          value={operator && operator.username} // TODO: throws error, need to do smth with this
        />
        <Panel
          style={styles.panel}
          iconName="phone"
          title={L.common.telephone}
          value={vendor.telephone}
          onPress={() => callNumber(vendor.telephone)}
        />
        <PanelDivider />
        <Panel
          style={styles.panel}
          iconName="chrome-reader-mode"
          title={L.menu_screen.title}
          iconValue="keyboard-arrow-right"
          onPress={() => props.navigation.navigate("Menu")}
        />
        <Panel
          style={styles.panel}
          iconName="assignment"
          title={L.reports_screen.title}
          iconValue="keyboard-arrow-right"
          onPress={() => {
            props.setDailyReportAsync();
            props.navigation.navigate("Reports");
          }}
        />
        <Panel
          style={styles.panel}
          iconName="local-shipping"
          title={L.couriers_screen.title}
          iconValue="keyboard-arrow-right"
          onPress={() => props.navigation.navigate("Couriers")}
        />
      </ScrollView>
      <Modal
        isVisible={modalOpen}
        onBackdropPress={() => setModalOpen(false)}
        animationIn="fadeIn"
        animationOut="fadeOut"
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
      >
        <View style={styles.modal}>
          <Panel
            style={styles.panel}
            iconName="exit-to-app"
            title={L.profile_screen.log_out}
            onPress={() => {
              resetAppState();
              props.navigation.navigate("AuthLoading");
            }}
          />
        </View>
      </Modal> */}
    </View>
  );
}

ProfileScreen.navigationOptions = {
  title: L.profile_screen.title
};
