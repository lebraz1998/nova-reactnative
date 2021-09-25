import moment from 'moment';
import React, {useEffect, useMemo, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {
  Button,
  Card,
  Header,
  LinearProgress,
  Text,
} from 'react-native-elements';

import DashboardServices from '../../services/book';
import {Book} from '../../types/book';
import {SearchBar} from 'react-native-elements';

export default function DashboardComponent() {
  const [date, setDate] = useState(Date.now()),
    dashboardServices = useMemo(() => new DashboardServices(), []),
    [book, setBook] = useState<Array<Book>>([]),
    [loading, setLoading] = useState(false),
    [search, setSearch] = useState('');
  useEffect(() => {
    dashboardServices.getBook().then(res => {
      setBook(res.result);
      setLoading(true);
    });
  }, []);
  return (
    <ScrollView>
      <View>
        <Header
          placement="left"
          centerComponent={{text: 'Appointment', style: {color: '#fff'}}}
        />
        <Calendar
          markedDates={{
            [`${moment(date).format('yyyy-MM-DD')}`]: {selected: true},
          }}
          onDayPress={e => {
            setDate(e.timestamp);
          }}
        />

        <View>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={
              ((text: string) => {
                setSearch(text);
              }) as any
            }
            onChange={e => {}}
            value={search}
            onBlur={undefined}
            onFocus={undefined}
            loadingProps={undefined}
            platform={'default'}
            onClear={undefined}
            clearIcon={undefined}
            searchIcon={undefined}
            showLoading={undefined}
            onCancel={undefined}
            cancelButtonTitle={undefined}
            cancelButtonProps={undefined}
            showCancel={undefined}
            lightTheme={false}
            round={false}
          />

          {loading ? (
            book
              .filter(res =>
                moment(res.createDate).format('yyyy-MM-D') ===
                  moment(date).format('yyyy-MM-D') || search.length > 0
                  ? res.admin
                      .toLocaleLowerCase()
                      .startsWith(search.toLocaleLowerCase())
                  : false,
              )

              .sort((a, b) => a.createDate - b.createDate)
              .map(res => (
                <Card key={res._id}>
                  <Text style={{fontSize: 25, textAlign: 'center'}}>
                    {res.title}
                  </Text>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{fontSize: 23}}>{res.admin}</Text>
                    <Text style={{fontSize: 23}}>${res.price}</Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{fontSize: 18}}>
                      Start:{' '}
                      {moment(res.startAppointmentTime).format('hh:mm a')}
                    </Text>
                    <Text style={{fontSize: 18}}>
                      End: {moment(res.endAppointmentTime).format('hh:mm a')}
                    </Text>
                  </View>
                  <Button
                    onPress={e => {
                      setLoading(false);
                      dashboardServices
                        .addAppointment({
                          admin: res.admin,
                          endAppointmentTime: res.endAppointmentTime,
                          id: res._id,
                          price: res.price,
                          startAppointmentTime: res.startAppointmentTime,
                          title: res.title,
                        })
                        .then(res => {
                          dashboardServices.getBook().then(res => {
                            setBook(res.result);
                            setLoading(true);
                          });
                        });
                    }}
                    title="Appointment"></Button>
                </Card>
              ))
          ) : (
            <LinearProgress color="#3498db" />
          )}
        </View>
      </View>
    </ScrollView>
  );
}
