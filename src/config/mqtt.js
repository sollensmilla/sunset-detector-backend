/**
 * MQTT configuration settings, including the broker URL and topic, sourced from environment variables.
 */
export const MQTT_CONFIG = {

    brokerUrl: process.env.MQTT_BROKER,

    topic: process.env.MQTT_TOPIC
}