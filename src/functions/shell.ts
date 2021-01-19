const exec = require('child_process').exec;

/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string}
 * @return {Promise<string>}
 */
export const execShellCommand = (cmd: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        exec(cmd, (error: any, stdout: string, stderr: string) => {
            if (error) {
                reject(stdout + stderr);
            } else {
                resolve(stdout);
            }
        });
    });
}
