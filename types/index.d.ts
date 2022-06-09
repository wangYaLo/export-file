

interface exportFile {
    exportExecl: (data: string) => Promise<string>
}

export = exportFile