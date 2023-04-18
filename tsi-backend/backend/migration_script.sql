IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221009155923_inicial')
BEGIN
    CREATE TABLE [Torneo] (
        [Id] int NOT NULL IDENTITY,
        [Nombre] nvarchar(max) NOT NULL,
        [FechaInicio] date NOT NULL,
        [FechaFin] date NOT NULL,
        CONSTRAINT [PK_Torneo] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221009155923_inicial')
BEGIN
    CREATE TABLE [Usuario] (
        [Id] int NOT NULL IDENTITY,
        [Nombre] nvarchar(max) NOT NULL,
        [Apellido] nvarchar(max) NOT NULL,
        [Email] nvarchar(max) NOT NULL,
        [Password] nvarchar(max) NOT NULL,
        [Fnac] date NOT NULL,
        [Rol] int NOT NULL,
        CONSTRAINT [PK_Usuario] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221009155923_inicial')
BEGIN
    CREATE TABLE [EventoDeportivo] (
        [Id] int NOT NULL IDENTITY,
        [TipoJuego] nvarchar(max) NOT NULL,
        [EquipoA] nvarchar(max) NOT NULL,
        [EquipoB] nvarchar(max) NOT NULL,
        [ScoreEquipoA] int NOT NULL,
        [ScoreEquipoB] int NOT NULL,
        [FechaEvento] date NOT NULL,
        [TorneoId] int NOT NULL,
        CONSTRAINT [PK_EventoDeportivo] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_EventoDeportivo_Torneo_TorneoId] FOREIGN KEY ([TorneoId]) REFERENCES [Torneo] ([Id]) ON DELETE NO ACTION
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221009155923_inicial')
BEGIN
    CREATE TABLE [Penca] (
        [Id] int NOT NULL IDENTITY,
        [Nombre] nvarchar(max) NOT NULL,
        [Premios] nvarchar(max) NOT NULL,
        [TorneoId] int NULL,
        [Discriminator] nvarchar(max) NOT NULL,
        [CostoEntrada] real NULL,
        [Comision] real NULL,
        [Theme] int NULL,
        [PrecioEntrada] real NULL,
        CONSTRAINT [PK_Penca] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Penca_Torneo_TorneoId] FOREIGN KEY ([TorneoId]) REFERENCES [Torneo] ([Id]) ON DELETE NO ACTION
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221009155923_inicial')
BEGIN
    CREATE TABLE [PencaUsuario] (
        [pencasUsuarioId] int NOT NULL,
        [usuariosInscriptosId] int NOT NULL,
        CONSTRAINT [PK_PencaUsuario] PRIMARY KEY ([pencasUsuarioId], [usuariosInscriptosId]),
        CONSTRAINT [FK_PencaUsuario_Penca_pencasUsuarioId] FOREIGN KEY ([pencasUsuarioId]) REFERENCES [Penca] ([Id]) ON DELETE NO ACTION,
        CONSTRAINT [FK_PencaUsuario_Usuario_usuariosInscriptosId] FOREIGN KEY ([usuariosInscriptosId]) REFERENCES [Usuario] ([Id]) ON DELETE NO ACTION
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221009155923_inicial')
BEGIN
    CREATE TABLE [Prediccion] (
        [Id] int NOT NULL IDENTITY,
        [ScoreEquipoA] int NOT NULL,
        [ScoreEquipoB] int NOT NULL,
        [UsuarioId] int NOT NULL,
        [EventosDeportivoId] int NOT NULL,
        [EventoDeportivoId] int NOT NULL,
        [PencaId] int NOT NULL,
        CONSTRAINT [PK_Prediccion] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Prediccion_EventoDeportivo_EventoDeportivoId] FOREIGN KEY ([EventoDeportivoId]) REFERENCES [EventoDeportivo] ([Id]) ON DELETE NO ACTION,
        CONSTRAINT [FK_Prediccion_Penca_PencaId] FOREIGN KEY ([PencaId]) REFERENCES [Penca] ([Id]) ON DELETE NO ACTION,
        CONSTRAINT [FK_Prediccion_Usuario_UsuarioId] FOREIGN KEY ([UsuarioId]) REFERENCES [Usuario] ([Id]) ON DELETE NO ACTION
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221009155923_inicial')
BEGIN
    CREATE INDEX [IX_EventoDeportivo_TorneoId] ON [EventoDeportivo] ([TorneoId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221009155923_inicial')
BEGIN
    CREATE INDEX [IX_Penca_TorneoId] ON [Penca] ([TorneoId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221009155923_inicial')
BEGIN
    CREATE INDEX [IX_PencaUsuario_usuariosInscriptosId] ON [PencaUsuario] ([usuariosInscriptosId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221009155923_inicial')
BEGIN
    CREATE INDEX [IX_Prediccion_EventoDeportivoId] ON [Prediccion] ([EventoDeportivoId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221009155923_inicial')
BEGIN
    CREATE INDEX [IX_Prediccion_PencaId] ON [Prediccion] ([PencaId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221009155923_inicial')
BEGIN
    CREATE INDEX [IX_Prediccion_UsuarioId] ON [Prediccion] ([UsuarioId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221009155923_inicial')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20221009155923_inicial', N'6.0.9');
END;
GO

COMMIT;
GO

