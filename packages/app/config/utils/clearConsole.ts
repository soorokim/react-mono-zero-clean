/**
 * terminal 화면을 다 지워지는 함수
 */
export default () => {
  process.stdout.write(process.platform === "win32" ? "\x1B[2J\x1B[0f" : "\x1B[2J\x1B[3J\x1B[H");
};
