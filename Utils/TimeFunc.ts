export default function compareTime(originalTime: Date, duration: number) {
  const currTime = new Date();
  console.log(originalTime.getMinutes() - currTime.getMinutes(), " Time Now");
}
