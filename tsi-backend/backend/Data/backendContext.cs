using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using backend.Entities;

namespace backend.Data {
    public class BackendContext : DbContext {
        public BackendContext (DbContextOptions<BackendContext> options)
            : base(options) {
        }

        public DbSet<Usuario> Usuario { get; set; } = default!;

        public DbSet<EventoDeportivo> EventoDeportivo { get; set; } = default!;

        public DbSet<Prediccion> Prediccion { get; set; } = default!;

        public DbSet<Torneo> Torneo { get; set; } = default!;

        public DbSet<Penca> Penca { get; set; } = default!;

        public DbSet<PozoCompartido> PencaPozoCompartido { get; set; } = default!;

        public DbSet<Empresarial> PencaEmpresarial { get; set; } = default!;

        public DbSet<TransaccionPaypal> TransaccionPaypal { get; set; } = default!;

        public DbSet<UsuarioPenca> UsuarioPenca { get; set; } = default!;

        public DbSet<Foro> Foro { get; set; } = default!;
        public DbSet<Mensaje> Mensaje { get; set; } = default!;


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Global turn off delete behaviour on foreign keys
            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }

            modelBuilder.Entity<UsuarioPenca>().HasKey(a => new { a.UsuarioId, a.PencaId });


        }
    }
}
